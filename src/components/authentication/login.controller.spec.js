describe('Login controller', function () {
    var controller,
        authServiceMock,
        stateMock,
        testUserCredentials,
        deferred,
        rootScope;

    beforeEach(module('VideoPortalApp'));

    beforeEach(inject(function ($rootScope, $q, $controller) {
        rootScope = $rootScope;
        deferred = $q.defer();

        testUserCredentials = {
            login: 'test',
            password: 'test'
        };

        authServiceMock = {
            signIn: sinon.stub().returns(deferred.promise)
        };

        stateMock = {
            go: sinon.spy()
        };

        controller = $controller('Login', {
            '$state': stateMock,
            'authenticationService': authServiceMock
        });
    }));

    it('should not have alerts on start', function () {
        expect(controller.alerts).toBeDefined();
        expect(controller.alerts.length).toEqual(0);
    });

    it('should delete appropriate alert when it is closed', function () {
        controller.alerts = [
            {message: 1},
            {message: 2},
            {message: 3}
        ];

        controller.closeAlert(1);

        expect(controller.alerts.length).toEqual(2);
        expect(controller.alerts[0].message).toBe(1);
        expect(controller.alerts[1].message).toBe(3);
    });

    it('should add alert notification when fail to sign in', function () {
        //user is not authenticated
        deferred.resolve(false);

        controller
            .signIn(testUserCredentials)
            .then(function () {
                expect(controller.alerts.length).toEqual(1);
            });

        rootScope.$apply();
    });

    it('should clear only password field when fail to sign in', function () {
        //user is not authenticated
        deferred.resolve(false);

        controller
            .signIn(testUserCredentials)
            .then(function () {
                expect(testUserCredentials.login).toEqual('test');
                expect(testUserCredentials.password).toEqual('');
            });

        rootScope.$apply();
    });

    it('should change state when sign in is successful', function () {
        //user is authenticated
        deferred.resolve(true);

        stateMock.go.withArgs('courses.list');

        controller
            .signIn(testUserCredentials)
            .then(function () {
                expect(stateMock.go.withArgs('courses.list').calledOnce).toBeTruthy();
            });

        rootScope.$apply();
    });
});