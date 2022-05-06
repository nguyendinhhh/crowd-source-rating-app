// test file for functions from ../controllers/user.controller.js
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import * as userController from '../controllers/user.controller.js';
import User from "../models/user.model";

// mock req and res?
// https://www.npmjs.com/package/jest-mock-req-res
const mockReq = mockRequest({ body: {id: 111} });
const mockRes = mockResponse();

// test functions
describe("user.controller.js tests", () => {

    // https://stackoverflow.com/questions/42619945/mocking-mongoose-model-with-jest
    describe("register tests", () => {

        test("register succeeds", () => {

            const mockSave = jest.spyOn(User.prototype, 'save')
            .mockImplementation(() => {
               return Promise.resolve({
                    user: "testUser"
               });
            });

            // const mockThen = jest.spyOn(Promise.prototype, 'then')
            // .mockImplementation(() => {
            //     mockRes.json({
            //         successMessage: "Registration Successful"
            //     });
            // });

            userController.register(mockReq, mockRes);

            expect(mockSave).toBeCalled();
            //expect(mockThen).toBeCalled();
            console.log(mockRes.json);
            expect(mockRes.json).not.toBeNull();
            //expect(mockRes.json.successMessage).toBe("Registration Successful");
        });

        // https://jestjs.io/docs/tutorial-async#error-handling
        // test("register fails", () => {
            
        //     const mockSave = jest.spyOn(User.prototype, 'save')
        //     .mockImplementation(() => Promise.reject("Failed register"));
            
        //     const mockCatch = jest.spyOn(Promise.prototype, 'catch')
        //     .mockImplementation(() => {
        //         mockRes.status(400).json(err);
        //     });

        //     expect.assertions(1);
        //     return userController.register(mockReq, mockRes)
        //     .catch(err => {

        //         expect(err).toEqual(new Error("Failed register"));
        //         //expect(mockSave).toBeCalled();
        //         //expect(mockThen).toBeCalled();
        //         //expect(mockRes.status).toBeCalledWith(400);
        //     });

        // });

    });

    // describe("login tests", () => {
        
    //     // https://stackoverflow.com/questions/52171771/how-to-mock-mongoose-query-like-findone
    //     test("login succeeds", () => {
        
    //     });
    
    //     test("login fails", () => {
            
    //     });

    // });

    // test("logout", () => {
        
    //     logout(mockReq, mockRes);
        
    //     expect(mockRes.clearCookie).toEqual("usertoken");
    //     expect(mockRes.json).toEqual({
    //         message: "You have successfully logged out",
    //     });

    // })

    // test("getLoggedInUser", () => {
        
    // });

    test("getOneUser succeeds", () => {

        // https://jestjs.io/docs/jest-object#jestspyonobject-methodname
        // https://stackoverflow.com/questions/52171771/how-to-mock-mongoose-query-like-findone
        const mockFindOne = jest.spyOn(User, 'findOne')
        .mockReturnValue(Promise.resolve({id: "exampleUser"}));

        const query = User.findOne();

        //User.prototype.then(query);
        
        expect(mockFindOne).toHaveBeenCalled();
        expect(mockFindOne).toHaveBeenCalledTimes(1);
        expect(query).not.toBeNull();
        console.log(query);

    });

    // test("getOneUser fails", () => {

    //     // https://jestjs.io/docs/jest-object#jestspyonobject-methodname
    //     // https://stackoverflow.com/questions/52171771/how-to-mock-mongoose-query-like-findone
    //     const mockFindOne = jest.spyOn(User, 'findOne')
    //     .mockImplementation(() => ({
    //         catch: jest.fn()
    //         .mockRejectedValue(new Error())
    //     }));
        
    // });

    // test("changePassword", () => {
        
    // });

    // test("findAllUsers", () => {
        
    // });

    // test("deleteUser", () => {
        
    // });

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

});

