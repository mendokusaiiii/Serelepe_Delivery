const userCustomerLocalStorage = {
    email: 'zebirita@email.com',
    name: 'Cliente Zé Birita',
    role: 'customer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSBaw6kgQm1yaXRhIiwiZW1haWwiOiJ6ZWJpcm10YUB1bWFpbC5jb20iLCJyb2x1IjoiY3VzdG9tZXIiLCJpYXQiOjE2NjQ0ODE5NjB9.-sYRByo95-WNfLD-_SemgQjJ-AD07c2ptSL01bWVCtw',
}

const salesMockList = [
    {
        "id": 1,
        "userId": 3,
        "sellerId": 2,
        "totalPrice": "64.22",
        "deliveryAddress": "Rua A",
        "deliveryNumber": "12312312",
        "saleDate": "2023-05-17T22:04:30.000Z",
        "status": "Pendente",
        "Products": [
            {
                "id": 2,
                "name": "Heineken 600ml",
                "price": "7.50",
                "urlImage": "http://localhost:3001/images/heineken_600ml.jpg",
                "SalesProducts": {
                    "saleid": 1,
                    "productId": 2,
                    "quantity": 5
                }
            },
            {
                "id": 5,
                "name": "Skol 269ml",
                "price": "2.19",
                "urlImage": "http://localhost:3001/images/skol_269ml.jpg",
                "SalesProducts": {
                    "saleid": 1,
                    "productId": 5,
                    "quantity": 4
                }
            },
            {
                "id": 6,
                "name": "Skol Beats Senses 313ml",
                "price": "4.49",
                "urlImage": "http://localhost:3001/images/skol_beats_senses_313ml.jpg",
                "SalesProducts": {
                    "saleid": 1,
                    "productId": 6,
                    "quantity": 4
                }
            },
        ]
    },
    {
        "id": 2,
        "userId": 3,
        "sellerId": 2,
        "totalPrice": "107.06",
        "deliveryAddress": "Rua G",
        "deliveryNumber": "123",
        "saleDate": "2023-05-18T16:40:30.000Z",
        "status": "Pendente",
        "Products": [
            {
                "id": 2,
                "name": "Heineken 600ml",
                "price": "7.50",
                "urlImage": "http://localhost:3001/images/heineken_600ml.jpg",
                "SalesProducts": {
                    "saleid": 2,
                    "productId": 2,
                    "quantity": 5
                }
            },
            {
                "id": 5,
                "name": "Skol 269ml",
                "price": "2.19",
                "urlImage": "http://localhost:3001/images/skol_269ml.jpg",
                "SalesProducts": {
                    "saleid": 2,
                    "productId": 5,
                    "quantity": 4
                }
            },
            {
                "id": 6,
                "name": "Skol Beats Senses 313ml",
                "price": "4.49",
                "urlImage": "http://localhost:3001/images/skol_beats_senses_313ml.jpg",
                "SalesProducts": {
                    "saleid": 2,
                    "productId": 6,
                    "quantity": 4
                }
            },
            {
                "id": 10,
                "name": "Skol Beats Senses 269ml",
                "price": "3.57",
                "urlImage": "http://localhost:3001/images/skol_beats_senses_269ml.jpg",
                "SalesProducts": {
                    "saleid": 2,
                    "productId": 10,
                    "quantity": 12
                }
            },
]
    }
]

const salesMock = {
    products: [
        {
            productId: 2,
            quantity: 2,
        },
        {
            productId: 4,
            quantity: 2,
        },
    ],
    sales: {
        userId: 3,
        sellerId: 2,
        totalPrice: 30.00,
        deliveryAddress: 'rua A',
        deliveryNumber: "123",
    },
}

const createSaleMockResponse = {
    dataValues: {
        saleDate: '2023-05-17T22:04:30.000Z',
        status: 'Pendente',
        id: 1,
        userId: 3,
        sellerId: 2,
        totalPrice: 30,
        deliveryAddress: 'rua A',
        deliveryNumber: 123
    }
}

module.exports = {
    userCustomerLocalStorage,
    salesMockList,
    salesMock,
    createSaleMockResponse,
}