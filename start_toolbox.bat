@echo off
echo ========================================
echo    Digital Toolbox Launcher
echo ========================================
echo.

REM Check if virtual environment exists
if not exist "myenv\Scripts\activate.bat" (
    echo Creating virtual environment...
    python -m venv myenv
    if errorlevel 1 (
        echo Error: Failed to create virtual environment
        pause
        exit /b 1
    )
)

REM Activate virtual environment
echo Activating virtual environment...
call myenv\Scripts\activate.bat

REM Install/update dependencies
echo Installing dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

REM Launch the application
echo.
echo Starting Digital Toolbox...
echo The application will open in your default web browser
echo Press Ctrl+C to stop the application
echo.
python run_app.py

pause
