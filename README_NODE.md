# 🔧 Digital Toolbox - Modern Node.js Version

A modern, responsive web application built with Node.js, Express, and React. Extract tables from websites and PDFs with a beautiful, intuitive interface.

![Digital Toolbox Logo](images/digital_toolbox_logo.jpg)

## ✨ Features

### 🌐 Web Scraping Tool
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **Website Table Extraction**: Extract all tables from any website with a simple URL input
- **PDF Table Extraction**: Upload PDF files and extract tables automatically
- **Smart Table Detection**: Automatically detects and processes table structures
- **Excel Export**: Select specific tables and export them to Excel files with multiple sheets
- **Real-time Preview**: Preview tables before exporting to ensure accuracy
- **Progress Indicators**: Loading states and error handling for better UX

### 🚀 Technical Stack
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js
- **PDF Processing**: pdf-parse for text extraction
- **Web Scraping**: Cheerio for HTML parsing
- **Excel Export**: xlsx library for file generation
- **Styling**: Tailwind CSS with custom components

## 🛠️ Installation

### Prerequisites
- Node.js 16+ and npm
- Modern web browser

### Quick Start

1. **Clone and navigate to the project**
   ```bash
   git clone https://github.com/StartingBlockAI/misc_tools.git
   cd misc_tools
   ```

2. **Install dependencies**
   ```bash
   # Windows
   start-node-app.bat
   
   # Or manually:
   npm run install-all
   ```

3. **Start the application**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📖 Usage

### Web Scraping Tool

#### Website Scraping
1. Navigate to the Web Scraping tool
2. Enter the URL of the website you want to scrape
3. Click "Scrape Tables"
4. Preview the found tables
5. Select the tables you want to export
6. Enter a filename and click "Export to Excel"

#### PDF Processing
1. Navigate to the Web Scraping tool
2. Switch to the "PDF Processing" tab
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
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   └── App.jsx         # Main app component
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── routes/            # API routes
│   └── index.js           # Server entry point
├── package.json           # Root package.json
├── start-node-app.bat     # Windows startup script
└── README_NODE.md         # This file
```

## 🔧 Development

### Available Scripts

```bash
# Install all dependencies (root + client)
npm run install-all

# Start both frontend and backend in development
npm run dev

# Start only the backend server
npm run server

# Start only the frontend client
npm run client

# Build for production
npm run build

# Start production server
npm start
```

### API Endpoints

- `POST /api/scraping/scrape` - Scrape website for tables
- `POST /api/scraping/export` - Export tables to Excel
- `POST /api/pdf/extract` - Extract tables from PDF
- `POST /api/pdf/export` - Export PDF tables to Excel
- `GET /api/health` - Health check

## 🎨 UI Features

### Modern Design
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Dark/Light Theme**: Automatic theme detection
- **Smooth Animations**: Fade-in, slide-up, and hover effects
- **Loading States**: Spinners and progress indicators
- **Error Handling**: User-friendly error messages

### Components
- **Dashboard**: Overview of available tools
- **Sidebar Navigation**: Easy tool switching
- **Table Preview**: Interactive table preview with selection
- **File Upload**: Drag-and-drop PDF upload
- **Export Interface**: Filename input and download

## 🚀 Performance

- **Fast Loading**: Vite for lightning-fast development
- **Code Splitting**: Automatic code splitting for optimal loading
- **Caching**: Intelligent caching for better performance
- **Rate Limiting**: API rate limiting to prevent abuse
- **File Size Limits**: 10MB limit for PDF uploads

## 🔒 Security

- **CORS Protection**: Configured CORS for security
- **Helmet.js**: Security headers
- **Rate Limiting**: API rate limiting
- **Input Validation**: Server-side validation
- **File Type Validation**: PDF-only uploads

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Rob Salamon**
- GitHub: [@StartingBlockAI](https://github.com/StartingBlockAI)
- LinkedIn: [Rob Salamon](https://linkedin.com/in/rob-salamon)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the amazing frontend framework
- [Express.js](https://expressjs.com/) for the robust backend
- [Tailwind CSS](https://tailwindcss.com/) for beautiful styling
- [Vite](https://vitejs.dev/) for the fast build tool
- [Cheerio](https://cheerio.js.org/) for HTML parsing
- [xlsx](https://sheetjs.com/) for Excel file generation

---

**Happy coding! 🚀**
