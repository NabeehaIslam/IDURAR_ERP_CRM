pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
    }
    
    environment {
        PROJECT_NAME = 'IDURAR ERP/CRM'
        GITHUB_REPO = 'idurar-erp-crm'
    }
    
    stages {
        stage('1️⃣ Source: Code Checkout') {
            steps {
                script {
                    echo '=================================================='
                    echo '      SOURCE STAGE - CODE CHECKOUT'
                    echo '=================================================='
                    echo "Project: ${env.PROJECT_NAME}"
                    echo "Build Number: #${env.BUILD_NUMBER}"
                    echo "Branch: ${env.BRANCH_NAME}"
                    echo "Workspace: ${env.WORKSPACE}"
                    echo '=================================================='
                }
                
                checkout scm
                
                echo '✅ Source code checked out successfully!'
            }
        }
        
        stage('2️⃣ Source: Repository Structure') {
            steps {
                script {
                    echo '=================================================='
                    echo '      ANALYZING REPOSITORY STRUCTURE'
                    echo '=================================================='
                }
                
                bat '''
                    echo.
                    echo 📁 Repository Contents:
                    dir /B
                    
                    echo.
                    echo 🔍 Checking Project Structure:
                    if exist "backend" echo ✅ Backend directory found
                    if exist "frontend" echo ✅ Frontend directory found
                    if exist "package.json" echo ✅ Root package.json found
                    if exist "README.md" echo ✅ README.md found
                    if exist ".env.example" echo ✅ .env.example found
                '''
            }
        }
        
        stage('3️⃣ Source: Environment Verification') {
            steps {
                script {
                    echo '=================================================='
                    echo '      VERIFYING BUILD ENVIRONMENT'
                    echo '=================================================='
                }
                
                bat '''
                    echo.
                    echo 🔧 Node.js Version:
                    node --version
                    
                    echo.
                    echo 📦 NPM Version:
                    npm --version
                    
                    echo.
                    echo 🌿 Git Version:
                    git --version
                '''
            }
        }
        
        stage('4️⃣ Source: Dependencies Analysis') {
            steps {
                script {
                    echo '=================================================='
                    echo '      ANALYZING PROJECT DEPENDENCIES'
                    echo '=================================================='
                }
                
                script {
                    echo '🔍 Backend Dependencies:'
                }
                bat '''
                    cd backend
                    if exist "package.json" (
                        type package.json | findstr "name"
                        type package.json | findstr "version"
                        echo ✅ Backend package.json analyzed
                    ) else (
                        echo ❌ Backend package.json not found
                    )
                '''
                
                script {
                    echo '🔍 Frontend Dependencies:'
                }
                bat '''
                    cd frontend
                    if exist "package.json" (
                        type package.json | findstr "name"
                        type package.json | findstr "version"
                        echo ✅ Frontend package.json analyzed
                    ) else (
                        echo ❌ Frontend package.json not found
                    )
                '''
            }
        }
        
        stage('5️⃣ Source: Git Metadata') {
            steps {
                script {
                    echo '=================================================='
                    echo '      GIT COMMIT INFORMATION'
                    echo '=================================================='
                }
                
                bat '''
                    echo.
                    echo 📝 Latest Commit Details:
                    git log -1 --pretty=format:"Commit Hash: %%h%%nAuthor: %%an%%nDate: %%ad%%nMessage: %%s"
                    
                    echo.
                    echo.
                    echo 📊 Changed Files:
                    git diff-tree --no-commit-id --name-status -r HEAD
                    
                    echo.
                    echo 🌿 Current Branch:
                    git branch --show-current
                '''
            }
        }
    }
    
    post {
        success {
            script {
                echo '=================================================='
                echo '         ✅ BUILD SUCCESS!'
                echo '=================================================='
                echo "Build #${env.BUILD_NUMBER} completed successfully"
                echo "Project: ${env.PROJECT_NAME}"
                echo "All source stage checks passed!"
                echo '=================================================='
            }
        }
        
        failure {
            script {
                echo '=================================================='
                echo '         ❌ BUILD FAILED!'
                echo '=================================================='
                echo "Build #${env.BUILD_NUMBER} failed"
                echo "Check console output for errors"
                echo '=================================================='
            }
        }
        
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}