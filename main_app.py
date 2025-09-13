import streamlit as st
import pandas as pd
from scraping_tool import WebScrapingTool
import os
from pathlib import Path

# Page configuration
st.set_page_config(
    page_title="Digital Toolbox",
    page_icon="🔧",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
<style>
    .main-header {
        font-size: 3rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 2rem;
        color: #1f77b4;
    }
    .tool-card {
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        padding: 1.5rem;
        margin: 1rem 0;
        background-color: #f8f9fa;
        transition: all 0.3s ease;
    }
    .tool-card:hover {
        border-color: #1f77b4;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .tool-title {
        font-size: 1.5rem;
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 0.5rem;
    }
    .tool-description {
        color: #7f8c8d;
        margin-bottom: 1rem;
    }
    .status-success {
        color: #27ae60;
        font-weight: bold;
    }
    .status-error {
        color: #e74c3c;
        font-weight: bold;
    }
</style>
""", unsafe_allow_html=True)

def main():
    # Header
    st.markdown('<h1 class="main-header">🔧 Digital Toolbox</h1>', unsafe_allow_html=True)
    st.markdown("---")
    
    # Sidebar for tool selection
    st.sidebar.title("🛠️ Available Tools")
    
    # Tool selection
    tool_options = {
        "Web Scraping Tool": {
            "description": "Extract tables from websites and PDFs, then export to Excel",
            "icon": "🌐",
            "features": ["Website table extraction", "PDF table extraction", "Excel export", "Table preview"]
        },
        "Data Analysis Tool": {
            "description": "Analyze and visualize data (Coming Soon)",
            "icon": "📊",
            "features": ["Statistical analysis", "Data visualization", "Report generation"]
        },
        "File Converter Tool": {
            "description": "Convert between different file formats (Coming Soon)",
            "icon": "🔄",
            "features": ["Multiple format support", "Batch conversion", "Quality preservation"]
        }
    }
    
    selected_tool = st.sidebar.selectbox(
        "Choose a tool:",
        list(tool_options.keys()),
        index=0
    )
    
    # Display selected tool info
    tool_info = tool_options[selected_tool]
    st.sidebar.markdown(f"### {tool_info['icon']} {selected_tool}")
    st.sidebar.markdown(f"**Description:** {tool_info['description']}")
    st.sidebar.markdown("**Features:**")
    for feature in tool_info['features']:
        st.sidebar.markdown(f"• {feature}")
    
    st.sidebar.markdown("---")
    
    # Main content area
    if selected_tool == "Web Scraping Tool":
        web_scraping_interface()
    else:
        st.info(f"🚧 {selected_tool} is coming soon! Stay tuned for updates.")

def web_scraping_interface():
    st.markdown("## 🌐 Web Scraping Tool")
    st.markdown("Extract tables from websites and PDFs, then export them to Excel files.")
    
    # Create tabs for different input methods
    tab1, tab2 = st.tabs(["🌐 Website Scraping", "📄 PDF Processing"])
    
    with tab1:
        website_scraping_tab()
    
    with tab2:
        pdf_processing_tab()

def website_scraping_tab():
    st.markdown("### Extract Tables from Websites")
    
    # URL input
    url = st.text_input(
        "Enter website URL:",
        placeholder="https://example.com",
        help="Enter the full URL of the website you want to scrape"
    )
    
    col1, col2 = st.columns([1, 4])
    
    with col1:
        scrape_button = st.button("🔍 Scrape Tables", type="primary")
    
    with col2:
        if scrape_button and url:
            with st.spinner("Scraping website..."):
                try:
                    scraper = WebScrapingTool()
                    tables = scraper.scrape_website(url)
                    
                    if tables:
                        st.success(f"✅ Found {len(tables)} table(s)!")
                        display_tables_interface(tables, url)
                    else:
                        st.warning("⚠️ No tables found on this website.")
                        
                except Exception as e:
                    st.error(f"❌ Error scraping website: {str(e)}")
        elif scrape_button and not url:
            st.error("Please enter a valid URL")

def pdf_processing_tab():
    st.markdown("### Extract Tables from PDF Files")
    
    uploaded_file = st.file_uploader(
        "Choose a PDF file",
        type=['pdf'],
        help="Upload a PDF file to extract tables from"
    )
    
    if uploaded_file is not None:
        col1, col2 = st.columns([1, 4])
        
        with col1:
            process_button = st.button("📄 Process PDF", type="primary")
        
        with col2:
            if process_button:
                with st.spinner("Processing PDF..."):
                    try:
                        scraper = WebScrapingTool()
                        tables = scraper.scrape_pdf(uploaded_file)
                        
                        if tables:
                            st.success(f"✅ Found {len(tables)} table(s)!")
                            display_tables_interface(tables, uploaded_file.name)
                        else:
                            st.warning("⚠️ No tables found in this PDF.")
                            
                    except Exception as e:
                        st.error(f"❌ Error processing PDF: {str(e)}")

def display_tables_interface(tables, source_name):
    st.markdown("---")
    st.markdown(f"### 📋 Tables Found in: {source_name}")
    
    if not tables:
        st.info("No tables found.")
        return
    
    # Table selection
    selected_tables = []
    
    for i, table in enumerate(tables):
        with st.expander(f"Table {i+1} - {table.shape[0]} rows × {table.shape[1]} columns", expanded=True):
            # Checkbox for selection
            selected = st.checkbox(f"Select Table {i+1}", key=f"table_{i}")
            if selected:
                selected_tables.append((i, table))
            
            # Display table preview
            st.dataframe(table.head(10), use_container_width=True)
            
            if len(table) > 10:
                st.caption(f"Showing first 10 rows of {len(table)} total rows")
    
    # Export section
    if selected_tables:
        st.markdown("---")
        st.markdown("### 📤 Export Selected Tables")
        
        col1, col2, col3 = st.columns([2, 1, 1])
        
        with col1:
            filename = st.text_input(
                "Excel filename:",
                value=f"scraped_tables_{source_name.replace('.', '_')}.xlsx",
                help="Enter the name for your Excel file (without extension)"
            )
        
        with col2:
            export_button = st.button("📥 Export to Excel", type="primary")
        
        with col3:
            if st.button("🗑️ Clear Selection"):
                st.rerun()
        
        if export_button and filename:
            try:
                # Create Excel file with multiple sheets
                with pd.ExcelWriter(f"{filename}.xlsx", engine='openpyxl') as writer:
                    for table_idx, table in selected_tables:
                        sheet_name = f"Table_{table_idx + 1}"
                        table.to_excel(writer, sheet_name=sheet_name, index=False)
                
                st.success(f"✅ Successfully exported {len(selected_tables)} table(s) to {filename}.xlsx")
                
                # Provide download link
                with open(f"{filename}.xlsx", "rb") as file:
                    st.download_button(
                        label="📥 Download Excel File",
                        data=file.read(),
                        file_name=f"{filename}.xlsx",
                        mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    )
                
            except Exception as e:
                st.error(f"❌ Error exporting to Excel: {str(e)}")
    else:
        st.info("Select one or more tables above to export them to Excel.")

if __name__ == "__main__":
    main()
