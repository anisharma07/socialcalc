# SocialCalc

A collaborative spreadsheet application built with JavaScript that provides real-time editing capabilities and comprehensive spreadsheet functionality. SocialCalc offers a web-based alternative to traditional desktop spreadsheet applications with built-in collaboration features and extensive formula support.

## 🚀 Features

- **Interactive Spreadsheet Interface** - Full-featured spreadsheet with cells, formulas, and formatting
- **Real-time Collaboration** - Multi-user editing capabilities with live updates
- **Comprehensive Formula Engine** - Support for mathematical, logical, and text functions
- **Rich Text Formatting** - Cell styling, alignment, borders, and number formatting
- **Data Visualization** - Built-in charting and graphing capabilities
- **Import/Export Support** - Compatible with standard spreadsheet formats
- **Undo/Redo System** - Complete command history with reversible operations
- **Server-side Processing** - Perl backend for data persistence and collaboration
- **Cross-platform Compatibility** - Works in modern web browsers
- **Extensible Architecture** - Modular design for custom functionality

## 🛠️ Tech Stack

### Frontend
- **JavaScript (ES5)** - Core application logic and user interface
- **HTML4** - Markup structure and layout
- **CSS** - Styling and visual presentation
- **DOM Manipulation** - Direct browser API usage for UI updates

### Backend/Services  
- **Perl** - Server-side scripting and utilities
- **SocialCalc Server Components** - Custom Perl modules for spreadsheet operations

### Development Tools
- **Git** - Version control system
- **npm** - Package management and scripting
- **CommonJS** - Module system for JavaScript components

### Architecture
- **Client-Server Model** - Web-based frontend with Perl backend
- **Component-based Design** - Modular JavaScript architecture
- **Event-driven Programming** - Interactive user interface with real-time updates

## 📁 Project Structure

```
socialcalc/
├── socialcalc-3.js                    # Core SocialCalc engine
├── socialcalctableeditor.js           # Table editing functionality
├── socialcalcspreadsheetcontrol.js    # Main spreadsheet controller
├── socialcalcviewer.js               # Read-only spreadsheet viewer
├── socialcalcpopup.js                # Dialog and popup management
├── socialcalcconstants.js            # Application constants and configuration
├── formatnumber2.js                  # Number formatting utilities
├── formula1.js                       # Formula parsing and execution engine
├── socialcalc.css                    # Main stylesheet
├── images/                           # UI icons and graphics
├── *.html                           # Demo pages and test applications
├── *.pl                             # Perl server-side scripts
└── SocialCalcServersideUtilities.pm  # Perl utility modules
```

## 🔧 Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (Apache, Nginx, or development server)
- Perl 5.x (for server-side functionality)
- npm (Node.js package manager)

### Installation Steps
```bash
# Clone the repository
git clone https://github.com/anisharma07/socialcalc.git

# Navigate to project directory
cd socialcalc

# Install dependencies
npm install

# Set up web server to serve static files
# Point document root to the socialcalc directory

# For Perl server components (optional)
perl -c SocialCalcServersideUtilities.pm
```

## 🎯 Usage

### Development
```bash
# Serve files using a simple HTTP server
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if http-server is installed)
npx http-server

# Access demos at:
# http://localhost:8000/socialcalc2demo-0-8-1.html
# http://localhost:8000/socialcalc2demo10.html
# http://localhost:8000/ssctrltest1.html
```

### Production
```bash
# Deploy static files to web server
cp -r socialcalc/ /var/www/html/

# Configure server to serve .pl files (for Perl backend)
# Ensure CGI is enabled for Perl scripts
# Set appropriate permissions for .pl files
chmod +x *.pl
```

### Integration
```javascript
// Basic SocialCalc integration
// Include required JavaScript files in your HTML:
<script src="socialcalcconstants.js"></script>
<script src="socialcalc-3.js"></script>
<script src="socialcalctableeditor.js"></script>
<script src="formatnumber2.js"></script>
<script src="formula1.js"></script>
<script src="socialcalcpopup.js"></script>
<script src="socialcalcspreadsheetcontrol.js"></script>

// Initialize spreadsheet
var spreadsheet = new SocialCalc.SpreadsheetControl();
spreadsheet.InitializeSpreadsheetControl("container-id");
```

## 📱 Platform Support

- **Web Browsers**: Chrome, Firefox, Safari, Edge, Internet Explorer 8+
- **Operating Systems**: Windows, macOS, Linux (via web browser)
- **Mobile**: iOS Safari, Android Chrome (responsive design)
- **Server Platforms**: Linux, Unix, Windows (for Perl backend)

## 🧪 Testing

```bash
# Run basic functionality tests
# Open test files in browser:
# - ssctrltest1.html (Spreadsheet control test)
# - socialcalc2demo-0-8-1.html (Demo application)
# - socialcalc2demo10.html (Advanced demo)

# Manual testing checklist:
# 1. Cell editing and navigation
# 2. Formula calculation
# 3. Copy/paste operations
# 4. Formatting functions
# 5. Undo/redo functionality
```

## 🔄 Deployment

### Static Deployment
```bash
# Deploy to Apache/Nginx
sudo cp -r socialcalc/ /var/www/html/
sudo chown -R www-data:www-data /var/www/html/socialcalc/

# Configure MIME types for .js and .css files
# Ensure proper caching headers are set
```

### Server-side Features
```bash
# Configure Perl CGI (optional)
# Enable mod_cgi or mod_cgid in Apache
# Set up proper permissions for .pl scripts

# Test Perl components
perl -c simpleedit14.pl
perl -c simpleedit15.pl
perl -c socialcalcserver.pl
```

## 📊 Performance & Optimization

- **Modular Loading**: Load only required JavaScript modules
- **Image Optimization**: UI images are optimized GIF format
- **Client-side Processing**: Reduces server load with local calculations
- **Efficient Rendering**: Optimized DOM manipulation for large spreadsheets
- **Memory Management**: Proper cleanup of event handlers and objects

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing JavaScript coding style (ES5 compatible)
- Test changes across multiple browsers
- Update documentation for new features
- Ensure Perl components remain functional
- Maintain compatibility with existing APIs

### Code Style
- Use consistent indentation (spaces preferred)
- Comment complex algorithms and formulas
- Follow SocialCalc naming conventions
- Test formula engine changes thoroughly

## 📄 License

This project is licensed under the ISC License. See the `LICENSE.txt` file for details.

**Additional Legal Information:**
- Copyright (C) 2009 Socialtext, Inc. All Rights Reserved
- Based on original SocialCalc code licensed under Artistic License 2.0
- Some components may be subject to different licenses (see `LEGAL.txt`)
- SocialCalc and related trademarks are property of their respective owners

## 🙏 Acknowledgments

- **Dan Bricklin** - Original SocialCalc architect and developer
- **Socialtext, Inc.** - Original project sponsorship and development
- **Software Garden, Inc.** - Foundation wikiCalc technology
- **SocialCalc Community** - Ongoing development and maintenance

## 📞 Support & Contact

- **GitHub Issues**: [Report bugs and request features](https://github.com/anisharma07/socialcalc/issues)
- **Original Project**: [SocialCalc.org](http://socialcalc.org/)
- **Documentation**: Refer to source code comments and `Changes.txt` for detailed information
- **Community**: Join discussions on spreadsheet technology and collaborative editing

---

**Note**: This is a historical preservation of the SocialCalc project. For production use, consider modern alternatives or significant updates to support current web standards and security practices.