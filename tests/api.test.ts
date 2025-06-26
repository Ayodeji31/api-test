import { test, expect, request } from '@playwright/test';
import config from "../utils/config"

const URL = config.baseURL;

test.describe('Users API', () => {
  let voteId: number;
  let token: string = config.apiKey;

    test("Perform a GET request to /votes.", async({request}) => {
       const response = await request.fetch(`${URL}`, {
            method: 'get',
            headers: {
                'x-api-key': token
            }
          });
          expect(response.ok()).toBeTruthy();
          expect(response.status()).toBe(200);
          const votes = await response.json();
          expect(votes.length).toBeGreaterThan(0); 
    })

    test("Perform a GET request to /votes id", async({request}) => {
        const id = 31572;
        const response = await request.fetch(`${URL}/${id}`, {
             method: 'get',
             headers: {
                 'x-api-key': token
             }
           });
           expect(response.ok()).toBeTruthy();
           expect(response.status()).toBe(200);
           const vote = await response.json();
           expect(vote).toHaveProperty('id', 31572)
           expect(vote).toHaveProperty('image_id', vote.image_id)
           expect(vote).toHaveProperty('sub_id', vote.sub_id)
     })

     test("Perform a Post request to /votes id", async({request}) => {
        const response = await request.post(`${URL}`, {
             headers: {
                 'x-api-key': token
             },
             data: {
                image_id: "asf2",
                sub_id: "my-user-1234",
                value: 1
             }
           });
           expect(response.ok()).toBeTruthy();
           expect(response.status()).toBe(201);
           const vote = await response.json();
           console.log(vote);
           expect(vote).toHaveProperty('message',"SUCCESS");
           voteId = vote.id;
           expect(voteId).toBeDefined();
           console.log(voteId);
     })

     test("Perform a GET new request to /votes.", async({request}) => {
      const response = await request.fetch(`${URL}/${voteId}`, {
           method: 'get',
           headers: {
               'x-api-key': token
           }
         });
         expect(response.ok()).toBeTruthy();
         expect(response.status()).toBe(200);
         const votes = await response.json();
         expect(votes).toHaveProperty('id', voteId);
          expect(votes).toHaveProperty('image_id', votes.image_id);
          expect(votes).toHaveProperty('sub_id', votes.sub_id);
         expect(votes).toHaveProperty('value', votes.value);
         expect(votes).toHaveProperty('country_code', votes.country_code);
       })

       test("Perform a DELETE of new request on votes.", async({request}) => {
        const response = await request.delete(`${URL}/${voteId}`, {
             headers: {
                 'x-api-key': token
             }
           });
           expect(response.ok()).toBeTruthy();
           expect(response.status()).toBe(200);
           const votes = await response.json();
           expect(votes).toHaveProperty('message',"SUCCESS");
       })

       test("Perform a GET on a deleted request vote.", async({request}) => {
        const response = await request.fetch(`${URL}/${voteId}`, {
             method: 'get',
             headers: {
                 'x-api-key': token
             }
           });
            expect(response.ok()).toBeFalsy();
            expect(response.status()).toBe(404);
  
         }) 

})