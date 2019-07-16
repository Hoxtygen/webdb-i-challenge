# Database Queries

## Find all customers with postal code 1010

  SELECT * FROM Customers WHERE PostalCode = 1010;

## Find the phone number for the supplier with the id 11

  SELECT Phone FROM Suppliers WHERE SupplierID = 11;

## List first 10 orders ever places, descending by the order date

  SELECT * FROM Orders order by OrderDate desc limit 10;

## Find all customers that live in London, Madrid, or Brazil

  SELECT * FROM [Customers] WHERE City IN ('Madrid','London') OR Country = 'Brazil';

## Add a customer record for _"The Shire"_, the contact name is _"Bilbo Baggins"_ the address is _ -"1 Hobbit-Hole"_ in _"Bag End"_, postal code _"111"_ and the country is _"Middle Earth"_

  insert into Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
  values ("The Shire","Bilbo Baggins","1 Hobbit-Hole","Bag End","111","Middle Earth");

## Update _Bilbo Baggins_ record so that the postal code changes to _"11122"_

  update Customers
  set PostalCode = '11122'
  where ContactName = 'Bilbo Baggins';

## (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted

  SELECT COUNT(DISTINCT City) FROM Customers;

## (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name

  SELECT * FROM Suppliers WHERE length(SupplierName) > 20