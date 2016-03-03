describe('Authentication service', function () {
    var authService, httpBackend, cookies;

    beforeEach(module('VideoPortalApp'));

    beforeEach(function () {
        cookies = {};
    });

    beforeEach(module(function ($provide) {
        $provide.value('$cookies', cookies);
    }));

    beforeEach(inject(function (authenticationService, $httpBackend) {
        authService = authenticationService;
        httpBackend = $httpBackend;

        var testUser =  {
            id: 1,
            username: 'user',
            password: 'test'
        };

        $httpBackend.whenGET('/data/users').respond([ testUser ]);
        $httpBackend.whenGET('/data/users/1').respond(testUser);
    }));

    describe('checkUserAuthenticated method', function () {
        it('should get auth data from cookie', function () {
            cookies.get = sinon.spy();

            authService.checkUserAuthenticated();

            expect(cookies.get.calledOnce).toBeTruthy();
        });

        it('should change authData property', function () {
            cookies.get = sinon.stub().returns(undefined);

            authService.authData.userAuthenticated = true;
            authService.checkUserAuthenticated();

            expect(authService.authData.userAuthenticated).toBeFalsy();
        });

        it('should return false when cookie has no auth data', function () {
            cookies.get = sinon.stub().returns(undefined);

            var authenticated = authService.checkUserAuthenticated();

            expect(authenticated).toBeFalsy();
        });

        it('should return true when cookie has auth data', function () {
            cookies.get = sinon.stub().returns(1);

            var authenticated = authService.checkUserAuthenticated();

            expect(authenticated).toBeTruthy();
        });
    });

    describe('getCurrentUserInfo method', function() {
        it('should get auth data from cookie ', function () {
            cookies.get = sinon.spy();

            authService.getCurrentUserInfo();

            expect(cookies.get.calledOnce).toBeTruthy();
        });

        it('should change authData property when user authenticated', function () {
            cookies.get = sinon.stub().returns(1);

            authService.getCurrentUserInfo();

            httpBackend.flush();

            expect(authService.authData.user).toBeDefined();
            expect(authService.authData.user.username).toEqual('user');
            expect(authService.authData.user.password).toEqual('test');
        });

        it('should return current user when he is authenticated', function () {
            cookies.get = sinon.stub().returns(1);

            authService.getCurrentUserInfo().then(function(user) {
                expect(user).toBeDefined();
                expect(user.username).toEqual('user');
                expect(user.password).toEqual('test');
            });

            httpBackend.flush();
        });
    });

    describe('signIn method', function() {
        it('should return false when login and password are wrong', function () {
            authService.signIn('1', '1').then(function(authenticated) {
                expect(authenticated).toBeFalsy();
            });

            httpBackend.flush();
        });

        it('should return false when only password is wrong', function () {
            authService.signIn('user', '1').then(function(authenticated) {
                expect(authenticated).toBeFalsy();
            });

            httpBackend.flush();
        });

        it('should return true when login and password are correct', function () {
            cookies.put = sinon.spy();

            authService.signIn('user', 'test').then(function(authenticated) {
                expect(authenticated).toBeTruthy();
            });

            httpBackend.flush();
        });

        it('should put auth data to cookie when user authenticated', function () {
            cookies.put = sinon.spy();

            authService.signIn('user', 'test');

            httpBackend.flush();

            expect(cookies.put.calledOnce).toBeTruthy();
        });

        it('should change authData property when user authenticated', function () {
            cookies.put = sinon.spy();

            authService.signIn('user', 'test');

            httpBackend.flush();

            expect(authService.authData.userAuthenticated).toBeTruthy();
            expect(authService.authData.user).toBeDefined();
            expect(authService.authData.user.username).toEqual('user');
            expect(authService.authData.user.password).toEqual('test');
        });
    });

    describe('signOut method', function() {
        it('should remove cookie auth data', function () {
            cookies.remove = sinon.spy();

            authService.signOut();

            expect(cookies.remove.calledOnce).toBeTruthy();
        });

        it('should change authData property to empty', function () {
            cookies.remove = sinon.stub();

            authService.signOut();

            expect(authService.userAuthenticated).toBeFalsy();
            expect(authService.authData.user).toEqual({});
        });
    });
});