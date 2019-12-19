const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe("app", () => {
    it('should return a message from GET/',() => {
        return supertest(app)
                .get('/apps')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(response => {
                    expect(response.body).to.be.an('array');
                
                expect(response.body).to.have.lengthOf.at.least(1);
                
                const game = response.body[0];

                expect(game).to.include.all.keys("App","Rating","Genres")
                });
       
    })

    // Testing to see if an example search term returns the appropriate app response
    it('should return item containing search term', () => {
        const mySearchTerm = 'SUBWAY';
        return supertest(app)
                .get('/apps')
                .query({search: mySearchTerm})
                .expect(200)
                .expect('Content-Type', /json/)
                .then(response => {
                    expect(response.body).to.be.an('array');
                    expect(response.body).to.have.lengthOf.at.least(1);
                    const searchTerm = response.body[0].App;
                    expect(searchTerm.toUpperCase()).to.include(mySearchTerm);
                })
    })
    
it("should be 400 if sort is incorrect",() => {
        return supertest(app)
            .get('/apps')
            .query({sort:"GARY"})
            .expect(400,"Sort must be either rating or app")
    }) 

it("should be 400 if genre is incorrect",() => {
        return supertest(app)
            .get('/apps')
            .query({genres:"GARY"})
            .expect(400,"Sort must be by approved genres.")
    })       

it("should sort alphabetically", () => {
    return supertest(app)
        .get('/apps')
        .query({sort:"App"})
        .expect(200)
        .expect("Content-Type", /json/)
        .then(res => {
            expect(res.body).to.be.an("array")
            let i = 0
            let sorted = true;
            while(sorted && i < res.body.length - 1){
                sorted = sorted && res.body[i].App < res.body[i + 1].App
                i++
            }
            expect(sorted).to.be.true;

        });
 
        
        
})
  
it("should sort ratings in ascending order", () => {
    return supertest(app)
        .get('/apps')
        .query({sort:"Rating"})
        .expect(200)
        .expect("Content-Type", /json/)
        .then(res => {
            expect(res.body).to.be.an("array")
            let i = 0;
            let sorted = true;
            while(sorted && i < res.body.length - 1){
                console.log(res.body[i].Rating, res.body[i + 1].Rating);
                sorted = sorted && res.body[i].Rating <= res.body[i + 1].Rating
                i++
            }
            expect(sorted).to.be.true;

        });
    
   
})  

})




