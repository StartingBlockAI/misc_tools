# 🔧 Digital Toolbox

A collection of powerful programming tools with an intuitive web interface built using Streamlit.

![Digital Toolbox Logo](images/digital_toolbox_logo.jpg)

## 🌟 Features

### 🌐 Web Scraping Tool
- **Website Table Extraction**: Extract all tables from any website with a simple URL input
- **PDF Table Extraction**: Upload PDF files and extract tables automatically
- **Smart Table Detection**: Automatically detects and processes table structures
- **Excel Export**: Select specific tables and export them to Excel files with multiple sheets
- **Table Preview**: Preview tables before exporting to ensure accuracy

### 🚀 Coming Soon
- **Data Analysis Tool**: Statistical analysis and data visualization
- **File Converter Tool**: Convert between different file formats

## 🛠️ Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/StartingBlockAI/misc_tools.git
   cd misc_tools
   ```

2. **Create a virtual environment (recommended)**
   ```bash
   python -m venv myenv
   
   # On Windows:
   myenv\Scripts\activate
   
   # On macOS/Linux:
   source myenv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python run_app.py
   ```
   
   Or directly with Streamlit:
   ```bash
   streamlit run main_app.py
   ```

5. **Open your browser**
   The application will automatically open at `http://localhost:8501`

## 📖 Usage

### Web Scraping Tool

#### Website Scraping
1. Select "Web Scraping Tool" from the sidebar
2. Go to the "Website Scraping" tab
3. Enter the URL of the website you want to scrape
4. Click "Scrape Tables"
5. Preview the found tables
6. Select the tables you want to export
7. Enter a filename and click "Export to Excel"

#### PDF Processing
1. Select "Web Scraping Tool" from the sidebar
2. Go to the "PDF Processing" tab
3. Upload a PDF file using the file uploader
4. Click "Process PDF"
5. Preview the extracted tables
6. Select and export tables to Excel

### Example URLs to Test
- [Wikipedia - List of US Cities by Population](https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population)
- [Wikipedia - Periodic Table](https://en.wikipedia.org/wiki/Periodic_table)
- Any website with HTML tables

## 🏗️ Project Structure

```
misc_tools/
├── main_app.py              # Main Streamlit application
├── scraping_tool.py         # Web scraping functionality
├── run_app.py              # Application launcher
├── requirements.txt        # Python dependencies
├── README.md              # This file
├── images/                # Application images
└── myenv/                 # Virtual environment (created after setup)
```

## 🔧 Technical Details

### Dependencies
- **Streamlit**: Web application framework
- **Pandas**: Data manipulation and analysis
- **BeautifulSoup4**: HTML parsing
- **Requests**: HTTP library
- **PyPDF2**: PDF processing
- **pdfplumber**: Advanced PDF table extraction
- **openpyxl**: Excel file creation

### Architecture
- **Frontend**: Streamlit web interface
- **Backend**: Python classes for data processing
- **Data Processing**: Pandas DataFrames for table manipulation
- **Export**: Excel files with multiple sheets

## 🚀 Advanced Usage

### Custom Table Selection
The tool automatically detects tables, but you can:
- Preview all found tables before selection
- Select specific tables for export
- Export multiple tables to a single Excel file with separate sheets

### Supported File Formats
- **Input**: HTML websites, PDF files
- **Output**: Excel (.xlsx) files

### Error Handling
- Network timeout protection
- Invalid URL handling
- PDF parsing fallbacks
- Table extraction error recovery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rob Salamon**
- GitHub: [@StartingBlockAI](https://github.com/StartingBlockAI)
- LinkedIn: [Rob Salamon](https://linkedin.com/in/rob-salamon)

## 🙏 Acknowledgments

- [Streamlit](https://streamlit.io/) for the amazing web framework
- [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/) for HTML parsing
- [Pandas](https://pandas.pydata.org/) for data manipulation
- [pdfplumber](https://github.com/jsvine/pdfplumber) for PDF table extraction

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/StartingBlockAI/misc_tools/issues) page
2. Create a new issue with detailed information
3. Contact the maintainer

---

**Happy coding! 🚀**
