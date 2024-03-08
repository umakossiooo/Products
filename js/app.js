"use strict";
// import { Product } from './clases.js';
Object.defineProperty(exports, "__esModule", { value: true });
// Import statements
var clases_1 = require("./clases");
var bootstrap = require("bootstrap");
// DOM elements
var tableBody = document.querySelector('#table-body');
var myModal_edit = new bootstrap.Modal(document.getElementById('modalProduct'));
var myModal_create = new bootstrap.Modal(document.getElementById('modalNewProduct'));
// Constants and variables
var itemsPerPage = 10;
var currentPage = 0;
var idProductUpdate = null;
// Fetch products function
var fetchProducts = function () {
    fetch('https://dummyjson.com/products')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var products = data.products;
        console.log(products);
        loadTable(products);
        // Pagination buttons event listeners
        document.getElementById('prevPage').addEventListener('click', function () {
            if (currentPage > 0) {
                currentPage--;
                loadTable(products);
            }
        });
        document.getElementById('nextPage').addEventListener('click', function () {
            var maxPage = Math.ceil(products.length / itemsPerPage) - 1;
            if (currentPage < maxPage) {
                currentPage++;
                loadTable(products);
            }
        });
        var myModal_edit;
        // Show modal function
        window.showModal = function (id) {
            idProductUpdate = id;
            var index = products.findIndex(function (item) { return item.id === idProductUpdate; });
            document.querySelector('#ProductModal').value = products[index].title;
            document.querySelector('#DescriptionModal').value = products[index].description;
            document.querySelector('#PriceModal').value = products[index].price.toString();
            document.querySelector('#DiscountModal').value = products[index].discountPercentage.toString();
            document.querySelector('#RatingModal').value = products[index].rating.toString();
            document.querySelector('#StockModal').value = products[index].stock.toString();
            document.querySelector('#BrandModal').value = products[index].brand;
            // const categoryId: string = products[index].category;
            // const categorySelect: HTMLSelectElement = document.querySelector('#CategoryModal')!;
            // for (let option of categorySelect.options) {
            //     if (option.value === categoryId) {
            //         option.selected = true;
            //     }
            // }
            document.querySelector('#CategoryModal').value = products[index].category;
            document.querySelector('#ThumbnailModal').value = products[index].thumbnail;
            document.querySelector('#ImagesModal').value = products[index].images;
            if (myModal_edit) {
                myModal_edit.show();
            }
            else {
                console.error("myModal_edit is null. Unable to show modal.");
            }
        };
        // Event listener for add new product button
        var openAddNewProduct = function () {
            if (myModal_create) {
                myModal_create.show();
            }
            else {
                console.error("myModal_create is null. Unable to show modal.");
            }
        };
        document.getElementById('addNewProductNavbarBtn').addEventListener('click', openAddNewProduct);
        // Update product function
        var productUpdate = function (e) {
            e.preventDefault();
            var index = products.findIndex(function (item) { return item.id === idProductUpdate; });
            products[index].title = document.querySelector('#ProductModal').value;
            products[index].description = document.querySelector('#DescriptionModal').value;
            products[index].price = parseFloat(document.querySelector('#PriceModal').value);
            products[index].discountPercentage = parseFloat(document.querySelector('#DiscountModal').value);
            products[index].rating = parseFloat(document.querySelector('#RatingModal').value);
            products[index].stock = parseInt(document.querySelector('#StockModal').value, 10);
            products[index].brand = document.querySelector('#BrandModal').value;
            products[index].category = document.querySelector('#CategoryModal').value;
            products[index].thumbnail = document.querySelector('#ThumbnailModal').value;
            products[index].images = document.querySelector('#ImagesModal').value;
            loadTable(products);
            if (myModal_edit) {
                myModal_edit.hide();
            }
            else {
                console.error("myModal_edit is null. Unable to show modal.");
            }
        };
        // Add product function
        var addProduct = function (event) {
            event.preventDefault();
            console.log('Add product button clicked');
            var id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
            var title = document.querySelector('#ProductModalNew').value;
            var description = document.querySelector('#DescriptionModalNew').value;
            var price = parseFloat(document.querySelector('#PriceModalNew').value);
            var discountPercentage = parseFloat(document.querySelector('#DiscountModalNew').value);
            var rating = parseFloat(document.querySelector('#RatingModalNew').value);
            var stock = parseInt(document.querySelector('#StockModalNew').value, 10);
            var brand = document.querySelector('#BrandModalNew').value;
            var category = document.querySelector('#CategoryModalNew').value;
            var thumbnail = document.querySelector('#ThumbnailModalNew').value;
            var images = document.querySelector('#ImagesModalNew').value;
            var newProduct = new clases_1.Product(id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images);
            console.log(newProduct);
            products.push(newProduct);
            document.querySelector("#formProduct").reset();
            loadTable(products);
            myModal_create.hide();
        };
        // Event listeners
        document.getElementById('addProductBtn').addEventListener('click', addProduct);
        document.querySelector('#formModal').addEventListener('submit', productUpdate);
        document.getElementById('saveChangesBtn').addEventListener('click', productUpdate);
    })
        .catch(function (error) {
        console.error('Error fetching products:', error);
    });
};
// Load table function
var loadTable = function (products) {
    if (tableBody) {
        tableBody.innerHTML = '';
        var startIndex = currentPage * itemsPerPage;
        var endIndex = startIndex + itemsPerPage;
        var productsToShow = products.slice(startIndex, endIndex);
        productsToShow.forEach(function (item) {
            var row = document.createElement('tr');
            var cells = "\n                <td>".concat(item.id, "</td>\n                <td>").concat(item.title, "</td>\n                <td><img src=\"").concat(item.thumbnail, "\" alt=\"Thumbnail\" style=\"max-width: 150px;\"></td>\n                <td>").concat(item.description, "</td>\n                <td>$").concat(item.price, "</td>\n                <td>%").concat(item.discountPercentage, "</td>\n                <td>").concat(item.rating, "</td>\n                <td>").concat(item.stock, "</td>\n                <td>").concat(item.brand, "</td>\n                <td>").concat(item.category, "</td>\n                <td>\n                    <div class=\"d-flex gap-2\">\n                        <button class=\"btn btn-outline-dark\"><i class=\"fa fa-eye\" aria-hidden=\"true\"></i></button>\n                        <button class=\"btn btn-outline-warning\" onclick=\"showModal(").concat(item.id, ")\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></button>\n                        <button class=\"btn btn-outline-danger\" onclick=\"deleteProduct(").concat(item.id, ")\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button>\n                    </div>\n                </td>");
            row.innerHTML = cells;
            tableBody.appendChild(row);
        });
    }
    else {
        console.error("tableBody is null. Unable to update the table.");
    }
};
// Call fetchProducts function
fetchProducts();
