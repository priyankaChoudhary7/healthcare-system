# Healthcare System

A robust healthcare data management system that handles both structured and unstructured medical data using PostgreSQL and MongoDB, deployed on AWS.

## Overview

This healthcare system provides a comprehensive solution for managing patient records, medical histories, and healthcare-related documents. It utilizes a dual-database approach:
- PostgreSQL for structured data (patient records, user credentials)
- MongoDB for unstructured data (medical images, reports)

## Features

- Centralized patient data management
- Secure user authentication and authorization
- Dual database architecture for optimal data handling
- AWS-based deployment for scalability
- FastAPI backend for efficient API endpoints
- Automated CI/CD pipeline using GitHub Actions

## Architecture

### Database Design

#### Structured Data (PostgreSQL)
- Users Table: Stores staff and admin information
- Patients Table: Contains patient demographic data
- Patient History Table: Tracks medical history and treatments

#### Unstructured Data (MongoDB)
- Patients_report Collection: Stores medical images and reports

### Security Features

- Multi-AZ deployment for high availability
- Data encryption at rest using AWS KMS
- TLS/SSL encryption for data in transit
- IP whitelisting and user authentication
- Regular automated backups

## Deployment

### Prerequisites
- AWS account with appropriate permissions
- MongoDB Atlas account
- PostgreSQL
- Python 3.x

### Environment Variables

```
MONGO_URI=your_mongodb_connection_string
DB_HOST=your_postgresql_host
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

### AWS Setup

1. Configure RDS for PostgreSQL:
   - Enable Multi-AZ deployment
   - Configure within VPC
   - Set up security groups

2. MongoDB Atlas Configuration:
   - Create cluster
   - Configure network access
   - Set up database user

### CI/CD Pipeline

The project uses GitHub Actions for automated deployment:
- Automated testing
- AWS deployment
- Database migrations
- Security checks

## API Endpoints

The system provides RESTful API endpoints built with FastAPI:
- User management
- Patient records
- Medical history
- Report management

## Database Backup

### PostgreSQL
- Daily automated backups
- 7-day retention policy
- Point-in-time recovery capability

### MongoDB
- Daily snapshots via MongoDB Atlas
- Configurable retention policy
- Automated backup verification

## Security Measures

- VPC configuration for network isolation
- IAM roles for access management
- Database credential management
- Regular security audits
- Data encryption at rest and in transit

## Development

### Local Setup

1. Clone the repository:
```bash
git clone https://github.com/priyankaChoudhary7/healthcare-system.git
cd healthcare-system
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run database migrations:
```bash
alembic upgrade head
```

5. Start the development server:
```bash
uvicorn app.main:app --reload
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request