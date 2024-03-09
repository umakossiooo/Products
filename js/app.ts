// import { Product } from './clases.js';

// const tableBody = document.querySelector('#table-body');
// const myModal_edit = new bootstrap.Modal(document.getElementById('modalProduct'));
// const myModal_create = new bootstrap.Modal(document.getElementById('modalNewProduct'));

// const itemsPerPage = 10;
// let currentPage = 0;
// let idProductUpdate = null;

// const fetchProducts = () =>
// {
//     fetch('https://dummyjson.com/products')
//         .then(response => response.json())
//         .then(data =>
//         {
//             const products = data.products;
//             console.log(products);
//             loadTable(products);

//             // Pagination buttons
//             document.getElementById('prevPage').addEventListener('click', () =>
//             {
//                 if (currentPage > 0)
//                 {
//                     currentPage--;
//                     loadTable(products);
//                 }
//             });

//             document.getElementById('nextPage').addEventListener('click', () =>
//             {
//                 const maxPage = Math.ceil(products.length / itemsPerPage) - 1;
//                 if (currentPage < maxPage)
//                 {
//                     currentPage++;
//                     loadTable(products);
//                 }
//             });


//             window.showModal = (id) =>
//             {
//                 idProductUpdate = id;

//                 let index = products.findIndex((item) => item.id == idProductUpdate);
//                 document.querySelector('#ProductModal').value = products[index].title;
//                 document.querySelector('#DescriptionModal').value = products[index].description;
//                 document.querySelector('#PriceModal').value = products[index].price;
//                 document.querySelector('#DiscountModal').value = products[index].discountPercentage;
//                 document.querySelector('#RatingModal').value = products[index].rating;
//                 document.querySelector('#StockModal').value = products[index].stock;
//                 document.querySelector('#BrandModal').value = products[index].brand;
//                 const categoryId = products[index].categoryId;
//                 const categorySelect = document.querySelector('#CategoryModal');
//                 for (let option of categorySelect.options) {
//                     if (option.value == categoryId) {
//                         option.selected = true;
//                     }
//                 }
//                 document.querySelector('#ThumbnailModal').value = products[index].thumbnail;
//                 document.querySelector('#ImagesModal').value = products[index].images;

//                 myModal_edit.show();
//             };

//             const openAddNewProduct = () =>
//             {
//                 myModal_create.show();
//             }

//             document.getElementById('addNewProductNavbarBtn').addEventListener('click', openAddNewProduct);

//             const productUpdate = (e) =>
//             {
//                 e.preventDefault();
//                 let index = products.findIndex((item) => item.id == idProductUpdate);
//                 products[index].title = document.querySelector('#ProductModal').value;
//                 products[index].description = document.querySelector('#DescriptionModal').value;
//                 products[index].price = document.querySelector('#PriceModal').value;
//                 products[index].discountPercentage = document.querySelector('#DiscountModal').value;
//                 products[index].rating = document.querySelector('#RatingModal').value;
//                 products[index].stock = document.querySelector('#StockModal').value;
//                 products[index].brand = document.querySelector('#BrandModal').value;
//                 products[index].categoryId = document.querySelector('#CategoryModal').value;
//                 products[index].thumbnail = document.querySelector('#ThumbnailModal').value;
//                 products[index].images = document.querySelector('#ImagesModal').value;

//                 loadTable(products);
//                 myModal_edit.hide();
//             };

//             const addProduct = (event) =>
//             {
//                 event.preventDefault();
//                 console.log('Add product button clicked');

//                 let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
//                 let title = document.querySelector('#ProductModalNew').value;
//                 let description = document.querySelector('#DescriptionModalNew').value;
//                 let price = document.querySelector('#PriceModalNew').value;
//                 let discountPercentage = document.querySelector('#DiscountModalNew').value;
//                 let rating = document.querySelector('#RatingModalNew').value;
//                 let stock = document.querySelector('#StockModalNew').value;
//                 let brand = document.querySelector('#BrandModalNew').value;
//                 let category = document.querySelector('#CategoryModalNew').value;
//                 let thumbnail = document.querySelector('#ThumbnailModalNew').value;
//                 let images = document.querySelector('#ImagesModalNew').value;

//                 // myModal_create().show;

//                 const newProduct = new Product(id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images);
//                 console.log(newProduct);
//                 products.push(newProduct);
//                 document.querySelector("#formProduct").reset();
//                 loadTable(products);
//                 myModal_create.hide();
//             }

//             document.getElementById('addProductBtn').addEventListener('click', addProduct);
//             document.querySelector('#formModal').addEventListener('submit', productUpdate);
//             document.getElementById('saveChangesBtn').addEventListener('click', productUpdate);
//         })

//         .catch(error =>
//         {
//             console.error('Error fetching products:', error);
//         });
// };
// fetchProducts();

// const loadTable = (products) =>
// {
//     tableBody.innerHTML = '';
//     const startIndex = currentPage * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;

//     const productsToShow = products.slice(startIndex, endIndex);

//     productsToShow.forEach(item =>
//     {
//         const row = document.createElement('tr')

//         const cells =
//             `
//             <td>${item.id}</td>
//             <td>${item.title}</td>
//             <td><img src="${item.thumbnail}" alt="Thumbnail" style="max-width: 150px;"></td>
//             <td>${item.description}</td>
//             <td>$${item.price}</td>
//             <td>%${item.discountPercentage}</td>
//             <td>${item.rating}</td>
//             <td>${item.stock}</td>
//             <td>${item.brand}</td>
//             <td>${item.category}</td>
//             <td>
//                 <div class="d-flex gap-2">
//                     <button class="btn btn-outline-dark"><i class="fa fa-eye" aria-hidden="true"></i></button>
//                     <button class="btn btn-outline-warning" onclick = "showModal(${item.id})"><i class="fa fa-pencil" aria-hidden="true"></i></button>
//                     <button class="btn btn-outline-danger" onclick= "deleteProduct(${item.id})"><i class="fa fa-times" aria-hidden="true"></i></button>
//                 </div>
//             </td>
//         `;
//         row.innerHTML = cells;
//         tableBody.appendChild(row);
//     });
// };
declare global {
    interface Window {
        showModal: (id: number) => void;
    }
}

declare global {
    interface Window {
        deleteProduct: (id: number) => void;
    }
}


// Import statements
import { Product } from './clases.js';
import * as bootstrap from 'bootstrap';

// DOM elements
const tableBody: HTMLTableSectionElement | null = document.querySelector('#table-body');
const myModal_edit: bootstrap.Modal = new bootstrap.Modal(document.getElementById('modalProduct')!);
const myModal_create: bootstrap.Modal = new bootstrap.Modal(document.getElementById('modalNewProduct')!);



// Constants and variables
const itemsPerPage: number = 10;
let currentPage: number = 0;
let idProductUpdate: number | null = null;

// Fetch products function
const fetchProducts = (): void => {
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then((data: { products: Product[] }) => {
            const products: Product[] = data.products;
            console.log(products);
            loadTable(products);

            // Pagination buttons event listeners
            document.getElementById('prevPage')!.addEventListener('click', () => {
                if (currentPage > 0) {
                    currentPage--;
                    loadTable(products);
                }
            });

            document.getElementById('nextPage')!.addEventListener('click', () => {
                const maxPage: number = Math.ceil(products.length / itemsPerPage) - 1;
                if (currentPage < maxPage) {
                    currentPage++;
                    loadTable(products);
                }
            });


            // let myModal_edit: bootstrap.Modal | null;

            // Show modal function
            window.showModal = (id: number, viewOnly: boolean = false): void => {
                idProductUpdate = id;
                const index: number = products.findIndex((item) => item.id === idProductUpdate);
                document.querySelector<HTMLInputElement>('#ProductModal')!.value = products[index].title;
                document.querySelector<HTMLInputElement>('#DescriptionModal')!.value = products[index].description;
                document.querySelector<HTMLInputElement>('#PriceModal')!.value = products[index].price.toString();
                document.querySelector<HTMLInputElement>('#DiscountModal')!.value = products[index].discountPercentage.toString();
                document.querySelector<HTMLInputElement>('#RatingModal')!.value = products[index].rating.toString();
                document.querySelector<HTMLInputElement>('#StockModal')!.value = products[index].stock.toString();
                document.querySelector<HTMLInputElement>('#BrandModal')!.value = products[index].brand;
                const categoryId: string = products[index].category;
                const categorySelect: HTMLSelectElement = document.querySelector('#CategoryModal')!;
                for (let option of categorySelect.options) {
                    if (option.value === categoryId) {
                        option.selected = true;
                    }
                }

                document.querySelector<HTMLInputElement>('#ThumbnailModal')!.value = products[index].thumbnail;
                document.querySelector<HTMLInputElement>('#ImagesModal')!.value = products[index].images;

                const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('#modalProduct input, #modalProduct select');
                inputs.forEach(input => {
                    input.disabled = viewOnly;
                });

                if (viewOnly) {
                    document.getElementById('ThumbnailModal')!.style.display = 'none';
                    document.getElementById('ImagesModal')!.style.display = 'none';
                    document.getElementById('saveChangesBtn')!.style.display = 'none';

                    const labels: NodeListOf<HTMLLabelElement>| null = document.querySelectorAll('#modalProduct label');
                    if (labels){
                        labels.forEach(label => {
                            const htmlFor = label.htmlFor;
                            if (htmlFor === 'ImagesModal' || htmlFor === 'ThumbnailModal') {
                                label.style.display = viewOnly ? 'none' : 'block';
                            }
                        });
                    }
                }

                if (myModal_edit) {
                    myModal_edit.show();
                } else {
                    console.error("myModal_edit is null. Unable to show modal.");
                }
            };

            // Event listener for add new product button
            const openAddNewProduct = (): void => {
                if (myModal_create) {
                    myModal_create.show();
                } else {
                    console.error("myModal_create is null. Unable to show modal.");
                }
            };

            document.getElementById('addNewProductNavbarBtn')!.addEventListener('click', openAddNewProduct);

            // Update product function
            const productUpdate = (e: Event): void => {
                e.preventDefault();
                const index: number = products.findIndex((item) => item.id === idProductUpdate);
                products[index].title = document.querySelector<HTMLInputElement>('#ProductModal')!.value;
                products[index].description = document.querySelector<HTMLInputElement>('#DescriptionModal')!.value;
                products[index].price = parseFloat(document.querySelector<HTMLInputElement>('#PriceModal')!.value);
                products[index].discountPercentage = parseFloat(document.querySelector<HTMLInputElement>('#DiscountModal')!.value);
                products[index].rating = parseFloat(document.querySelector<HTMLInputElement>('#RatingModal')!.value);
                products[index].stock = parseInt(document.querySelector<HTMLInputElement>('#StockModal')!.value, 10);
                products[index].brand = document.querySelector<HTMLInputElement>('#BrandModal')!.value;
                products[index].category = document.querySelector<HTMLSelectElement>('#CategoryModal')!.value;
                products[index].thumbnail = document.querySelector<HTMLInputElement>('#ThumbnailModal')!.value;
                products[index].images = document.querySelector<HTMLInputElement>('#ImagesModal')!.value;
                loadTable(products);
                if (myModal_edit) {
                    myModal_edit.hide();
                } else {
                    console.error("myModal_edit is null. Unable to show modal.");
                }
            };

            // Add product function
            const addProduct = (event: Event): void => {
                event.preventDefault();
                console.log('Add product button clicked');
                const id: number = products.length > 0 ? products[products.length - 1].id + 1 : 1;
                const title: string = document.querySelector<HTMLInputElement>('#ProductModalNew')!.value;
                const description: string = document.querySelector<HTMLInputElement>('#DescriptionModalNew')!.value;
                const price: number = parseFloat(document.querySelector<HTMLInputElement>('#PriceModalNew')!.value);
                const discountPercentage: number = parseFloat(document.querySelector<HTMLInputElement>('#DiscountModalNew')!.value);
                const rating: number = parseFloat(document.querySelector<HTMLInputElement>('#RatingModalNew')!.value);
                const stock: number = parseInt(document.querySelector<HTMLInputElement>('#StockModalNew')!.value, 10);
                const brand: string = document.querySelector<HTMLInputElement>('#BrandModalNew')!.value;
                const category: string = document.querySelector<HTMLInputElement>('#CategoryModalNew')!.value;
                const thumbnail: string = document.querySelector<HTMLInputElement>('#ThumbnailModalNew')!.value;
                const images: string = document.querySelector<HTMLInputElement>('#ImagesModalNew')!.value;
                const newProduct: Product = new Product(id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images);
                console.log(newProduct);
                products.push(newProduct);
                document.querySelector<HTMLFormElement>("#formProduct")!.reset();
                loadTable(products);
                myModal_create.hide();
            };


            window.deleteProduct = (id: number): void => {
                const index: number = products.findIndex((item) => item.id === id);
                const confirmDelete = confirm(`Are you sure you want to delete the product ${products[index].title}?`);

                if (confirmDelete) {

                    if (index !== -1) {
                        products.splice(index, 1);
                        loadTable(products);
                    } else {
                        console.error(`Product with ID ${id} not found.`);
                    }
                }
            }

            // Event listeners
            document.getElementById('addProductBtn')!.addEventListener('click', addProduct);
            document.querySelector<HTMLFormElement>('#formModal')!.addEventListener('submit', productUpdate);
            document.getElementById('saveChangesBtn')!.addEventListener('click', productUpdate);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
};


// Load table function
const loadTable = (products: Product[]): void => {
    if (tableBody) {
        tableBody.innerHTML = '';
        const startIndex: number = currentPage * itemsPerPage;
        const endIndex: number = startIndex + itemsPerPage;
        const productsToShow: Product[] = products.slice(startIndex, endIndex);
        productsToShow.forEach(item => {
            const row: HTMLTableRowElement = document.createElement('tr');
            const cells: string = `
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td><img src="${item.thumbnail}" alt="Thumbnail" style="max-width: 150px;"></td>
                    <td>${item.description}</td>
                    <td>$${item.price}</td>
                    <td>%${item.discountPercentage}</td>
                    <td>${item.rating}</td>
                    <td>${item.stock}</td>
                    <td>${item.brand}</td>
                    <td>${item.category}</td>
                    <td>
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-dark" onclick="showModal(${item.id}, true)"><i class="fa fa-eye" aria-hidden="true"></i></button>
                            <button class="btn btn-outline-warning" onclick="showModal(${item.id})"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                            <button class="btn btn-outline-danger" onclick="deleteProduct(${item.id})"><i class="fa fa-times" aria-hidden="true"></i></button>
                        </div>
                    </td>`;
            row.innerHTML = cells;
            tableBody.appendChild(row);
        });
    } else {
        console.error("tableBody is null. Unable to update the table.");
    }
};

// Call fetchProducts function
fetchProducts();