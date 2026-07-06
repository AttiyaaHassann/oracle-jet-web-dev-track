define(['chai','viewModels/incidents','knockout'], function(chai, IncidentsViewModel,ko)
{
    const expect = chai.expect;

    describe('Incidents unit test',() => {
        let viewModel;

        //setting up before each unit test
        beforeEach(()=>{
            viewModel = new IncidentsViewModel();
        });

        //  Cleaning up after each test
        afterEach(() => {
            viewModel = null;
        });

        //Actual test goes here 
        it('messageText should be "Hello World"',() => {
            expect(viewModel.messageText()).to.equal('Hello World');
        });
    });
});