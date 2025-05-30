import { test, expect, request } from '@playwright/test';

const URL = `https://api.thecatapi.com/v1/votes`

test.describe('Users API', () => {
    test("Perform a GET request to /votes.", async({request}) => {
       const response = await request.fetch(`${URL}`, {
            method: 'get',
            headers: {
                'x-api-key': 'DEMO-API-KEY'
            }
          });
          expect(response.ok()).toBeTruthy();
          expect(response.status()).toBe(200);
          const votes = await response.json();
          console.log(votes);
          expect(votes.length).toBeGreaterThan(0); 
    })

    test("Perform a GET request to /votes id", async({request}) => {
        const id = 31572;
        const response = await request.fetch(`${URL}/${id}`, {
             method: 'get',
             headers: {
                 'x-api-key': 'DEMO-API-KEY'
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
          //   method: 'post',
             headers: {
                 'x-api-key': 'DEMO-API-KEY'
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
           expect(vote).toHaveProperty('message',"SUCCESS");
     })

})