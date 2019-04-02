const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const User = require('../models/users');
const Book = require('../models/books');

// add describe block for users
describe('User model', () => {

    it('should be able to create a new user', async () => {

        const newUserObject = {
            email: 'test@test.com',
            username: 'test',
            password: 'test'
        }
        const newUserID = await User.createUser(newUserObject);
        expect(newUserID).to.be.a('number');
    })
    it('should show info about a user by ID', async () => {

        const aUser = await User.getById(18);
        expect(aUser).to.be.instanceOf(User);
    })

})

describe('Book model', () => {
    it('should be able to add new books', async () => {

        const newBookObject = {
            title: 'The Fellowship of the Ring',
            author: 'JRR Tolkien',
            genre: 'fantasy'
        }

        const newBookID = await Book.createBook(newBookObject);
        expect(newBookID).to.be.a('number');
    })

    it('should be able to get a book by ID', async () => {

        const aBook = await Book.getById(4);
        expect(aBook).to.be.instanceOf(Book);


    })
    it('should sort and show books by genre', async () => {

        const fictionBooks = await Book.sortBy('fiction');
        fictionBooks.forEach(fictionBook => {
            expect(fictionBook).to.be.instanceOf(Book);
        })

    })

})

describe('Users and books', () => {

    it('user should be able to add a book (user "owns" the book)', async () => {
        const aUser = await User.getById(35);
        console.log(aUser);

        const ownedID = await aUser.buyBook(5) // book ID goes here
        console.log(ownedID);

        // better test would be to compare the total owned books for this user before and then after
        expect(ownedID).to.be.a('number');
    })

    it('user can remove the book from their owned list aka delete book', async () => {
        // const aUser = await User.getById(18);

        // await aUser.removeBook(4);

        // expect



    })

    it('user can sell book to another user within the database', async () => {


    })

    it('user should be able to see all books that they own', async () => {

        

    })

})