#!/usr/bin/env python3
"""
Digital Toolbox Launcher
Run this script to start the Digital Toolbox application
"""

import subprocess
import sys
import os

def main():
    """Launch the Streamlit application"""
    try:
        # Check if we're in a virtual environment
        if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
            print("✅ Virtual environment detected")
        else:
            print("⚠️  Warning: No virtual environment detected. Consider using a virtual environment.")
        
        # Launch Streamlit app
        print("🚀 Starting Digital Toolbox...")
        print("📱 The application will open in your default web browser")
        print("🔗 If it doesn't open automatically, go to: http://localhost:8501")
        print("⏹️  Press Ctrl+C to stop the application")
        print("-" * 50)
        
        # Run the Streamlit app
        subprocess.run([
            sys.executable, "-m", "streamlit", "run", "main_app.py",
            "--server.port", "8501",
            "--server.address", "localhost",
            "--browser.gatherUsageStats", "false"
        ])
        
    except KeyboardInterrupt:
        print("\n👋 Digital Toolbox stopped. Goodbye!")
    except Exception as e:
        print(f"❌ Error starting application: {e}")
        print("\n💡 Make sure you have installed all dependencies:")
        print("   pip install -r requirements.txt")

if __name__ == "__main__":
    main()
