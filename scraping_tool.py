import requests
from bs4 import BeautifulSoup
import pandas as pd
import streamlit as st
from io import BytesIO
import PyPDF2
import pdfplumber
import re
from typing import List, Union

class WebScrapingTool:
    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
    
    def scrape_website(self, url: str) -> List[pd.DataFrame]:
        """
        Scrape all tables from a website URL
        """
        try:
            # Validate URL
            if not url.startswith(('http://', 'https://')):
                url = 'https://' + url
            
            # Get the webpage
            response = requests.get(url, headers=self.headers, timeout=30)
            response.raise_for_status()
            
            # Parse HTML
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find all tables
            tables = soup.find_all('table')
            
            if not tables:
                return []
            
            dataframes = []
            
            for i, table in enumerate(tables):
                try:
                    # Extract table data
                    rows = []
                    for tr in table.find_all('tr'):
                        cells = []
                        for cell in tr.find_all(['th', 'td']):
                            # Get text content and clean it
                            text = cell.get_text(strip=True)
                            # Remove extra whitespace and newlines
                            text = re.sub(r'\s+', ' ', text)
                            cells.append(text)
                        
                        if cells:  # Only add non-empty rows
                            rows.append(cells)
                    
                    if not rows:
                        continue
                    
                    # Convert to DataFrame
                    df = pd.DataFrame(rows)
                    
                    # Try to use first row as header if it looks like headers
                    if len(df) > 1:
                        # Check if first row looks like headers (contains mostly text, not numbers)
                        first_row = df.iloc[0]
                        if all(isinstance(cell, str) and not cell.replace('.', '').replace('-', '').isdigit() 
                               for cell in first_row if cell):
                            df.columns = first_row
                            df = df[1:].reset_index(drop=True)
                    
                    # Clean up the dataframe
                    df = df.dropna(how='all')  # Remove completely empty rows
                    df = df.loc[:, ~df.columns.duplicated()]  # Remove duplicate columns
                    
                    if not df.empty:
                        dataframes.append(df)
                        
                except Exception as e:
                    st.warning(f"Error processing table {i+1}: {str(e)}")
                    continue
            
            return dataframes
            
        except requests.exceptions.RequestException as e:
            raise Exception(f"Failed to fetch website: {str(e)}")
        except Exception as e:
            raise Exception(f"Error scraping website: {str(e)}")
    
    def scrape_pdf(self, pdf_file) -> List[pd.DataFrame]:
        """
        Extract tables from a PDF file
        """
        try:
            # Read PDF content
            pdf_content = pdf_file.read()
            
            # Try using pdfplumber first (better for table extraction)
            try:
                return self._extract_tables_pdfplumber(pdf_content)
            except Exception as e:
                st.warning(f"pdfplumber failed, trying PyPDF2: {str(e)}")
                return self._extract_tables_pypdf2(pdf_content)
                
        except Exception as e:
            raise Exception(f"Error processing PDF: {str(e)}")
    
    def _extract_tables_pdfplumber(self, pdf_content: bytes) -> List[pd.DataFrame]:
        """Extract tables using pdfplumber (preferred method)"""
        dataframes = []
        
        with pdfplumber.open(BytesIO(pdf_content)) as pdf:
            for page_num, page in enumerate(pdf.pages):
                try:
                    # Extract tables from this page
                    tables = page.extract_tables()
                    
                    for table_num, table in enumerate(tables):
                        if table and len(table) > 1:  # Ensure table has data
                            # Convert to DataFrame
                            df = pd.DataFrame(table[1:], columns=table[0])
                            
                            # Clean up the dataframe
                            df = df.dropna(how='all')
                            df = df.loc[:, ~df.columns.duplicated()]
                            
                            if not df.empty:
                                dataframes.append(df)
                                
                except Exception as e:
                    st.warning(f"Error processing page {page_num + 1}: {str(e)}")
                    continue
        
        return dataframes
    
    def _extract_tables_pypdf2(self, pdf_content: bytes) -> List[pd.DataFrame]:
        """Fallback method using PyPDF2"""
        dataframes = []
        
        try:
            pdf_reader = PyPDF2.PdfReader(BytesIO(pdf_content))
            
            for page_num, page in enumerate(pdf_reader.pages):
                try:
                    text = page.extract_text()
                    
                    # Simple table detection based on patterns
                    lines = text.split('\n')
                    table_lines = []
                    
                    for line in lines:
                        # Look for lines that might be table rows (contain multiple separators)
                        if '|' in line or '\t' in line or line.count('  ') > 2:
                            # Split by common separators
                            if '|' in line:
                                cells = [cell.strip() for cell in line.split('|')]
                            elif '\t' in line:
                                cells = [cell.strip() for cell in line.split('\t')]
                            else:
                                # Split by multiple spaces
                                cells = [cell.strip() for cell in re.split(r'\s{2,}', line)]
                            
                            if len(cells) > 1:  # Only add if it looks like a table row
                                table_lines.append(cells)
                    
                    if len(table_lines) > 1:
                        # Convert to DataFrame
                        df = pd.DataFrame(table_lines)
                        
                        # Try to use first row as header
                        if len(df) > 1:
                            df.columns = df.iloc[0]
                            df = df[1:].reset_index(drop=True)
                        
                        # Clean up
                        df = df.dropna(how='all')
                        df = df.loc[:, ~df.columns.duplicated()]
                        
                        if not df.empty:
                            dataframes.append(df)
                            
                except Exception as e:
                    st.warning(f"Error processing page {page_num + 1}: {str(e)}")
                    continue
        
        except Exception as e:
            raise Exception(f"PyPDF2 processing failed: {str(e)}")
        
        return dataframes

# Example usage (for testing)
if __name__ == "__main__":
    # Test the scraper
    scraper = WebScrapingTool()
    
    # Test with a known website
    url = "https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population"
    print("Testing website scraping...")
    tables = scraper.scrape_website(url)
    print(f"Found {len(tables)} tables")
    
    if tables:
        print("\nFirst table preview:")
        print(tables[0].head())