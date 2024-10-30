---
title: SQL Command Category and Data Normalization
author: Haijun (Navy) Su
layout: post
tags: [sql database]
---

## Types of SQL Commands

* DDL (Data Definition Language): CREAE, ALTER, DROP
* DML (Data Manipulation Language): SELECT, INSERT, UPDATE, DELETE
* DCL (Data Control Language): GRANT, REVOKE
* TCL (Transaction Control Language): COMMIT, ROLLBACK, SAVEPOINT
* DQL (Data Query Language): SELECT

## Normalization

Normalization is the process of organizing the data in a database to reduce redundancy and improve data integrity. It involves dividing large tables into smaller ones and defining relationships between them. THere are several normal forms, like 1NF, 2NF, 3NF and BCNF.

### 1NF (First Normal Form)

1NF ensures that each table cell contains a single value and each record is unique. In other words, every column must contain atomic, indivisible values, and there must be no repeating groups.

### 2NF (Second Normal Form)

2NF builds on 1NF by ensuring that all non-key attributes are fully functional dependent on the primary key. This means that there are no partial dependencies of any column on the primary key. All non-key attributes should depend on the entire primary key if it's composite.

### 3NF (Third Normal Form)

3NF builds on 2NF by ensuring that all non-key attributes are not only fully functional dependent on the primary key but also independent of each other. This means that there should be no transitive dependencies, where non-key attributes depend on other non-key attributes.

### BCNF (Boyce-Codd Normal Form)

BCNF is an advanced version of 3NF. A table is in BCNF if it is in 3NF and every determinant is a candidate key. This means that for any functional dependency, the left-hand side must be a super key. It eliminates redundancy caused by functional dependencies.

### Example

Imagine a table storing information about employees and departments:

| EmployeeID | EmployeeName | Department | DepartmentHead |
| ---------- | ------------ | ---------- | -------------- |
| 1          | Alice        | HR         | John           |
| 2          | Bob          | IT         | Jane           |
| 3          | Charlie      | IT         | Jane           |

**1NF:** The table is in 1NF because each cell contains a single value, and there are no repeating groups.

**2NF:** It is in 2NF because each non-key attribute (EmployeeName, Department, DepartmentHead) is fully dependent on the primary key (EmployeeID).

**3NF:** The table is not in 3NF because DepartmentHead depends on Department, not just EmployeeID. To fix this, you split the table:

| EmployeeID | EmployeeName | Department |
| ---------- | ------------ | ---------- |
| 1          | Alice        | HR         |
| 2          | Bob          | IT         |
| 3          | Charlie      | IT         |

| Department | DepartmentHead |
| ---------- | -------------- |
| HR         | John           |
| IT         | Jane           |

BCNF: Both new tables are in BCNF because all determinants are candidate keys.
