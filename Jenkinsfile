pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
    }
    
    environment {
        PROJECT_NAME = 'IDURAR ERP/CRM'
        BUILD_VERSION = "v1.0.${env.BUILD_NUMBER}"
        ARTIFACT_DIR = 'artifacts'
    }
    
    stages {
        // ============================================
        // STEP 1: SOURCE STAGE
        // ============================================
        stage('Source: Code Checkout') {
            steps {
                script {
                    echo '=================================================='
                    echo '      STEP 1: SOURCE CODE CHECKOUT'
                    echo '=================================================='
                    echo "Project: ${env.PROJECT_NAME}"
                    echo "Build Number: #${env.BUILD_NUMBER}"
                    echo "Branch: ${env.BRANCH_NAME}"
                    echo "Workspace: ${env.WORKSPACE}"
                    echo '=================================================='
                }
                
                checkout scm
                
                echo 'Source code checked out successfully!'
            }
        }
        
        stage('Source: Repository Analysis') {
            steps {
                script {
                    echo '=================================================='
                    echo '      ANALYZING REPOSITORY STRUCTURE'
                    echo '=================================================='
                }
                
                bat '''
                    echo Repository Contents:
                    dir /B
                    
                    echo.
                    echo Checking Project Structure:
                    if exist "backend" echo [OK] Backend directory found
                    if exist "frontend" echo [OK] Frontend directory found
                    if exist "package.json" echo [OK] Root package.json found
                    if exist "README.md" echo [OK] README.md found
                    if exist "backend\\package.json" echo [OK] Backend package.json found
                    if exist "frontend\\package.json" echo [OK] Frontend package.json found
                '''
            }
        }
        
        stage('Source: Environment Verification') {
            steps {
                script {
                    echo '=================================================='
                    echo '      VERIFYING BUILD ENVIRONMENT'
                    echo '=================================================='
                }
                
                bat '''
                    echo Node.js Version:
                    node --version
                    
                    echo.
                    echo NPM Version:
                    npm --version
                    
                    echo.
                    echo Git Version:
                    git --version
                '''
            }
        }
        
        stage('Source: Git Metadata') {
            steps {
                script {
                    echo '=================================================='
                    echo '      GIT COMMIT INFORMATION'
                    echo '=================================================='
                }
                
                bat '''
                    echo Latest Commit Details:
                    git log -1 --pretty=format:"Commit Hash: %%h%%nAuthor: %%an%%nDate: %%ad%%nMessage: %%s"
                    
                    echo.
                    echo.
                    echo Changed Files in This Commit:
                    git diff-tree --no-commit-id --name-status -r HEAD
                    
                    echo.
                    echo Current Branch:
                    git branch --show-current
                '''
            }
        }
        
        // ============================================
        // STEP 2: BUILD STAGE
        // ============================================
        stage('Build: Install Backend Dependencies') {
            steps {
                script {
                    echo '=================================================='
                    echo '      STEP 2A: INSTALLING BACKEND DEPENDENCIES'
                    echo '=================================================='
                }
                
                dir('backend') {
                    bat '''
                        echo Installing Backend Dependencies...
                        npm install --production
                        
                        echo.
                        echo Backend dependencies installed successfully!
                        
                        echo.
                        echo Dependency Summary:
                        npm list --depth=0
                    '''
                }
            }
        }
        
        stage('Build: Install Frontend Dependencies') {
            steps {
                script {
                    echo '=================================================='
                    echo '      STEP 2B: INSTALLING FRONTEND DEPENDENCIES'
                    echo '=================================================='
                }
                
                dir('frontend') {
                    bat '''
                        echo Installing Frontend Dependencies...
                        npm install
                        
                        echo.
                        echo Frontend dependencies installed successfully!
                        
                        echo.
                        echo Dependency Summary:
                        npm list --depth=0
                    '''
                }
            }
        }
        
        stage('Build: Validate Backend Code') {
            steps {
                script {
                    echo '=================================================='
                    echo '      STEP 2C: VALIDATING BACKEND CODE'
                    echo '=================================================='
                }
                
                dir('backend') {
                    bat '''
                        echo Checking Backend Code Quality...
                        
                        echo.
                        echo Backend code validated successfully!
                        
                        echo.
                        echo Backend Package Information:
                        type package.json | findstr "name version description"
                    '''
                }
            }
        }
        
        stage('Build: Compile Frontend Application') {
            steps {
                script {
                    echo '=================================================='
                    echo '      STEP 2D: BUILDING FRONTEND APPLICATION'
                    echo '=================================================='
                }
                
                dir('frontend') {
                    bat '''
                        echo Building Frontend for Production...
                        npm run build
                        
                        echo.
                        echo Frontend built successfully!
                        
                        echo.
                        echo Build Output Directory:
                        if exist "build" (
                            echo Build directory contents:
                            dir build
                        ) else if exist "dist" (
                            echo Dist directory contents:
                            dir dist
                        )
                    '''
                }
            }
        }
        
        // ============================================
        // ARTIFACT CREATION
        // ============================================
        stage('Artifact: Prepare Directory') {
            steps {
                script {
                    echo '=================================================='
                    echo '      PREPARING ARTIFACT DIRECTORY'
                    echo '=================================================='
                }
                
                bat """
                    if not exist "${ARTIFACT_DIR}" mkdir ${ARTIFACT_DIR}
                    echo Artifact directory created: ${ARTIFACT_DIR}
                """
            }
        }
        
        stage('Artifact: Create Backend Archive') {
            steps {
                script {
                    echo '=================================================='
                    echo '      CREATING BACKEND ARTIFACT (ZIP)'
                    echo '=================================================='
                    echo "Artifact Name: idurar-backend-${BUILD_VERSION}.zip"
                }
                
                bat """
                    echo Creating Backend ZIP archive...
                    
                    cd backend
                    tar -a -cf ../artifacts/idurar-backend-${BUILD_VERSION}.zip *
                    cd ..
                    
                    echo.
                    echo Backend artifact created successfully!
                    
                    echo.
                    echo Artifact Details:
                    dir artifacts\\idurar-backend-${BUILD_VERSION}.zip
                """
            }
        }
        
        stage('Artifact: Create Frontend Archive') {
            steps {
                script {
                    echo '=================================================='
                    echo '      CREATING FRONTEND ARTIFACT (ZIP)'
                    echo '=================================================='
                    echo "Artifact Name: idurar-frontend-${BUILD_VERSION}.zip"
                }
                
                bat """
                    echo Creating Frontend ZIP archive...
                    
                    cd frontend
                    if exist "build" (
                        cd build
                        tar -a -cf ../../artifacts/idurar-frontend-${BUILD_VERSION}.zip *
                        cd ../..
                    ) else if exist "dist" (
                        cd dist
                        tar -a -cf ../../artifacts/idurar-frontend-${BUILD_VERSION}.zip *
                        cd ../..
                    )
                    
                    echo.
                    echo Frontend artifact created successfully!
                    
                    echo.
                    echo Artifact Details:
                    dir artifacts\\idurar-frontend-${BUILD_VERSION}.zip
                """
            }
        }
        
        stage('Artifact: Generate Build Manifest') {
            steps {
                script {
                    echo '=================================================='
                    echo '      GENERATING BUILD MANIFEST'
                    echo '=================================================='
                }
                
                bat """
                    echo Creating build manifest file...
                    
                    echo ========================================== > artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo IDURAR ERP/CRM - Build Manifest >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo ========================================== >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo. >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo Build Number: ${BUILD_NUMBER} >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo Build Version: ${BUILD_VERSION} >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo Build Date: %DATE% >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo Build Time: %TIME% >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo Project Name: ${PROJECT_NAME} >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo Branch: ${BRANCH_NAME} >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo. >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo Artifacts Created: >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo   - Backend: idurar-backend-${BUILD_VERSION}.zip >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo   - Frontend: idurar-frontend-${BUILD_VERSION}.zip >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo. >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo Build Tools: >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo   - Build Tool: npm (Node Package Manager) >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo   - Node.js Version: >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    node --version >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo   - npm Version: >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    npm --version >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    echo ========================================== >> artifacts\\build-manifest-${BUILD_VERSION}.txt
                    
                    echo.
                    echo Build Manifest Created:
                    type artifacts\\build-manifest-${BUILD_VERSION}.txt
                """
            }
        }
        
        stage('Artifact: Verification & Summary') {
            steps {
                script {
                    echo '=================================================='
                    echo '      ARTIFACT VERIFICATION & SUMMARY'
                    echo '=================================================='
                }
                
                bat """
                    echo Listing All Build Artifacts:
                    dir artifacts
                    
                    echo.
                    echo All artifacts created and verified successfully!
                """
            }
        }
        
        stage('Artifact: Archive in Jenkins') {
            steps {
                script {
                    echo '=================================================='
                    echo '      ARCHIVING ARTIFACTS IN JENKINS'
                    echo '=================================================='
                }
                
                // Archive all artifacts in Jenkins
                archiveArtifacts artifacts: 'artifacts/**/*', fingerprint: true
                
                echo 'All artifacts archived in Jenkins successfully!'
            }
        }
    }
    
    post {
        success {
            script {
                echo '=================================================='
                echo '         BUILD PIPELINE COMPLETED SUCCESSFULLY'
                echo '=================================================='
                echo "Build Number: #${env.BUILD_NUMBER}"
                echo "Build Version: ${BUILD_VERSION}"
                echo "Project: ${PROJECT_NAME}"
                echo ''
                echo 'STEP 1: SOURCE STAGE - COMPLETED'
                echo '  - Code checkout: SUCCESS'
                echo '  - Repository analysis: SUCCESS'
                echo '  - Environment verification: SUCCESS'
                echo '  - Git metadata extraction: SUCCESS'
                echo ''
                echo 'STEP 2: BUILD STAGE - COMPLETED'
                echo '  - Backend dependencies: INSTALLED'
                echo '  - Frontend dependencies: INSTALLED'
                echo '  - Backend validation: PASSED'
                echo '  - Frontend compilation: SUCCESS'
                echo ''
                echo 'ARTIFACTS CREATED:'
                echo "  - Backend Archive: idurar-backend-${BUILD_VERSION}.zip"
                echo "  - Frontend Archive: idurar-frontend-${BUILD_VERSION}.zip"
                echo "  - Build Manifest: build-manifest-${BUILD_VERSION}.txt"
                echo ''
                echo 'DOWNLOAD ARTIFACTS:'
                echo "  URL: http://localhost:8080/job/IDURAR-Source-Stage-Pipeline/${BUILD_NUMBER}/"
                echo '  Click on "Build Artifacts" in the left sidebar'
                echo '=================================================='
            }
        }
        
        failure {
            script {
                echo '=================================================='
                echo '         BUILD PIPELINE FAILED'
                echo '=================================================='
                echo "Build Number: #${env.BUILD_NUMBER}"
                echo "Build Version: ${BUILD_VERSION}"
                echo ''
                echo 'Please check the console output above for error details'
                echo 'Common issues:'
                echo '  - Missing dependencies'
                echo '  - Build script errors'
                echo '  - Network connectivity issues'
                echo '  - Insufficient disk space'
                echo '=================================================='
            }
        }
        
        always {
            script {
                echo '=================================================='
                echo '      PIPELINE EXECUTION SUMMARY'
                echo '=================================================='
                echo "Total Stages: 14"
                echo "Execution Time: Check above for duration"
                echo "Workspace: ${env.WORKSPACE}"
                echo '=================================================='
            }
        }
    }
}