const fulana = 'Fulana Pereira';
const fulanaEmail = 'fulana@deliveryapp.com';
const danillo = 'Danillo Santos';
const danilloEmail = 'dan@gmail.com';
const hanna = 'Hanna';
const hannaEmail = 'hanna@hanna.com';

const allMockList = [
    {
        id: 1,
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: 'a4c86edecc5aee06eff8fdeda69e0d04',
        role: 'administrator',
    },
    {
        id: 2,
        name: fulana,
        email: fulanaEmail,
        password: '3c28d2b0881bf46457a853e0b07531c6',
        role: 'seller',
    },
    {
        id: 3,
        name: 'Cliente Zé Birita',
        email: 'zebirita@email.com',
        password: '1c37466c159755ce1fa181bd247cb925',
        role: 'customer',
    },
];

const deleteMockList = [
    {
        id: 1,
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: 'a4c86edecc5aee06eff8fdeda69e0d04',
        role: 'administrator',
    },
    {
        id: 2,
        name: fulana,
        email: fulanaEmail,
        password: '3c28d2b0881bf46457a853e0b07531c6',
        role: 'seller',
    },
];

const deleteUserMock = {
    id: 3,
        name: 'Cliente Zé Birita',
        email: 'zebirita@email.com',
        password: '1c37466c159755ce1fa181bd247cb925',
        role: 'customer',
};

const OkUserMock = {
    email: hannaEmail,
    name: hanna,
    password: '$#zebirita#$',
};

const OkUserMock2 = {
    email: danilloEmail,
    name: danillo,
    password: '123456',
};

const queryMock = { dataValues: {
    id: 4,
    email: hannaEmail,
    name: hanna,
    password: '1c37466c159755ce1fa181bd247cb925',
    role: 'customer',
} };

const createServiceMock = {
    email: hannaEmail,
    name: hanna,
    role: 'customer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
};

const createAdminMock = { dataValues: {
    id: 5,
    name: danillo,
    email: danilloEmail,
    password: 'e10adc3949ba59abbe56e057f20f883e',
    role: 'seller',
} };

const sellerMock = [{
    id: 2,
    name: fulana,
    email: fulanaEmail,
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller',
}];

const createServiceMock2 = {
    email: danilloEmail,
    name: danillo,
    role: 'seller',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
};

const createErrorMock = {
    email: danilloEmail,
    name: danillo,
    password: 123456,
};

module.exports = {
    allMockList,
    deleteMockList,
    deleteUserMock,
    OkUserMock,
    OkUserMock2,
    queryMock,
    createServiceMock,
    createAdminMock,
    sellerMock,
    createServiceMock2,
    createErrorMock,
};