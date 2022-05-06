// test the navigate functons from Navbar.js
// https://testing-library.com/docs/example-reach-router/
// https://youtu.be/OS5mVVM5vAg
import Navbar from '../src/components/Navbar';
//import axios from 'axios';

// mocks

// mock navigate()
const mockNavigate = jest.fn();

// mock axios for logout() -- incomplete; not sure how to do it yet
// jest.mock('axios');
// console.log = jest.fn();
// axios.post.mockResolvedValue("logout link", {}, {withCredentials: true});

// mock Navbar functions
jest.mock('../src/components/Navbar', () => ({
    goHome: jest.fn(() => mockNavigate("/")),
    goCreate: jest.fn(() => mockNavigate("/create")),
    goManage: jest.fn(() => mockNavigate("/manage")),
    goLogin: jest.fn(() => mockNavigate("/login")),
}));

// test cases
describe("Navbar button navigation", () => {

    test("goHome", () => {

        Navbar.goHome();

        expect(Navbar.goHome).toBeCalled();
        expect(Navbar.goHome).toBeCalledTimes(1);
        expect(mockNavigate).toBeCalled();
        expect(mockNavigate).toBeCalledTimes(1);
        expect(mockNavigate).toBeCalledWith("/"); 

    });

    test("goCreate", () => {

        Navbar.goCreate();

        expect(Navbar.goCreate).toBeCalled();
        expect(Navbar.goCreate).toBeCalledTimes(1);
        expect(mockNavigate).toBeCalled();
        expect(mockNavigate).toBeCalledTimes(1);
        expect(mockNavigate).toBeCalledWith("/create"); 

    });

    test("goManage", () => {

        Navbar.goManage();

        expect(Navbar.goManage).toBeCalled();
        expect(Navbar.goManage).toBeCalledTimes(1);
        expect(mockNavigate).toBeCalled();
        expect(mockNavigate).toBeCalledTimes(1);
        expect(mockNavigate).toBeCalledWith("/manage"); 

    });

    test("goLogin", () => {

        Navbar.goLogin();

        expect(Navbar.goLogin).toBeCalled();
        expect(Navbar.goLogin).toBeCalledTimes(1);
        expect(mockNavigate).toBeCalled();
        expect(mockNavigate).toBeCalledTimes(1);
        expect(mockNavigate).toBeCalledWith("/login"); 

    });

    // not sure how to do this yet
    // describe("logout tests", () => {

    //     test("logout succeeds", () => {

    //         const e = "Random test value";
    //         Navbar.logout(e);
    
    //         //expect(Navbar.logout).toBeCalled();
    //         //expect(Navbar.logout).toBeCalledTimes(1);
    //         expect(axios.post).toBeCalled();
    //         expect(axios.post).toBeCalledTimes(1);
    //         expect(mockNavigate).toBeCalled();
    //         expect(mockNavigate).toBeCalledTimes(1);
    //         expect(mockNavigate).toBeCalledWith("/"); 
    
    //     });
    
    //     test("logout fails", () => {
    //         const err = axios.post.mockRejectedValueOnce();
    //         expect(console.log).toBeCalled();
    //         expect(console.log).toBeCalledTimes(1);
    //         expect(console.log).toBeCalledWith(err);
    //     });

    // });

    // remove history of mockNavigate calls since it's reused across test functions
    afterEach(() => {
        jest.clearAllMocks();
    });

});
