-- PostgreSQL Database Schema

-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Use hashed password
    email VARCHAR(100) UNIQUE NOT NULL,
    contact_number VARCHAR(20),
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Patients Table
CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    patient_name VARCHAR(100) NOT NULL,
    patient_email VARCHAR(100) UNIQUE,
    contact_number VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    added_by INTEGER REFERENCES users(user_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Patient History Table
CREATE TABLE patient_history (
    history_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(patient_id),
    medical_history TEXT,
    diagnosis TEXT,
    treatment TEXT,
    recorded_by INTEGER REFERENCES users(user_id),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_patient_name ON patients(patient_name);
CREATE INDEX idx_patient_email ON patients(patient_email);
CREATE INDEX idx_history_patient ON patient_history(patient_id);