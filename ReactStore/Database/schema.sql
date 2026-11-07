-- ReactStore Database Schema
-- Run once against your SQL Server instance

CREATE DATABASE ReactStoreDb;
GO

USE ReactStoreDb;
GO

CREATE TABLE Users (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    Email        NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(500) NOT NULL,
    Role         NVARCHAR(50)  NOT NULL DEFAULT 'User',
    CreatedAt    DATETIME2     NOT NULL DEFAULT GETUTCDATE()
);

CREATE TABLE Categories (
    Id   INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Products (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    Name        NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    Price       DECIMAL(18,2) NOT NULL,
    Stock       INT           NOT NULL DEFAULT 0,
    ImageUrl    NVARCHAR(500),
    CreatedAt   DATETIME2     NOT NULL DEFAULT GETUTCDATE()
);

CREATE TABLE ProductCategories (
    ProductId  INT NOT NULL REFERENCES Products(Id) ON DELETE CASCADE,
    CategoryId INT NOT NULL REFERENCES Categories(Id) ON DELETE CASCADE,
    PRIMARY KEY (ProductId, CategoryId)
);

CREATE TABLE Orders (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    UserId      INT           NOT NULL REFERENCES Users(Id),
    TotalAmount DECIMAL(18,2) NOT NULL,
    Status      NVARCHAR(50)  NOT NULL DEFAULT 'Pending',
    CreatedAt   DATETIME2     NOT NULL DEFAULT GETUTCDATE()
);

CREATE TABLE OrderItems (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    OrderId   INT           NOT NULL REFERENCES Orders(Id) ON DELETE CASCADE,
    ProductId INT           NOT NULL REFERENCES Products(Id),
    Quantity  INT           NOT NULL,
    Price     DECIMAL(18,2) NOT NULL
);

-- Seed: admin user  password = Admin@123
INSERT INTO Users (Email, PasswordHash, Role)
VALUES ('admin@reactstore.com',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewRzPZo.Z7Pk3f2W',
        'Admin');

INSERT INTO Categories (Name) VALUES ('Electronics'), ('Clothing'), ('Books'), ('Home & Garden');
GO
