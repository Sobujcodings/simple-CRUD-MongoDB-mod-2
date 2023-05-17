const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// MIDDLE WIRE
app.use(cors());
app.use(express.json());



//  *** NOTES
// * post is for database(no need to shwo data in the browser) & get is related to browser get data then show it in browser first(server) 
// * method r upor depend korbe (match hobe client sathe server) route/link r opor na tai same hole prblm nai
// get/post korle ai route akta link toyri hobe server e localhost soho shei link k client e dekhate response.send 
//kore then shei localhostsoho/pura URL ta k niye client e fetch kore,client e data ta k pabo(age server e pte hobe)
// ***
// POST korar jonno data client theke niye just databse e set kore deo browser e dekhate hobe nah r GET(READ)
// korte get use korbo shei link/url e data DB theke ene sheta server r browser e dekhabo then shei link niye
// client e use korbo
// post(req,res hoy) jabe database e R get(req,res hoy)method kichu na bolleo get hobe auto dhore nibe-jabe browser e
// necher ta akta example
// app.get('/sample', (req, res) => {
    // res.send('Simple Crud is Running')
    // send na korle server r code k UI te dekhte pabo na ai port e
// })
//




// mongoDB user and password
// merajsobuj
// gRalBLviFxhiiZAt


// mongoDB
// Add your connection string into your application code
// Replace <password> with the password for the merajsobuj user. Ensure any option params are URL encoded
// require/import can be placed at the top of the file  like others
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://merajsobuj:gRalBLviFxhiiZAt@cluster0.xxfexvc.mongodb.net/?retryWrites=true&w=majority";

// database(mongoDB) r sathe amr server r akta connection toyri korar jonno mongoDB r akta client banalam 
// mongoDB r akta client banalam (object akare) jetake amr server r sathe connect korabo (connection object toyri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        // server r sathe database(mongoDB) r j connect object ta banalam sheta connect korlam server r sathe
        // shei connection object k server r sathe connect korlam
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // mongo r server r sathe connect korbe
        // Send a ping to confirm a successful connection


        // *** inserting data into mongoDB  // (connect r  pore database r kaj korbo)
        // database and collection create ekhane korte parbo just insert ta func r vhitore (karon
        // ai function ei ami client theke data ta pacchi shetei database e rakhbo)
        const database = client.db("usersDB");
        const UserCollections = database.collection("users")
        // const UserCollections = client.db("userDB").collection("users");(shorhand databse r oikhane direct boshaya dilm)
        // doc tai holo data jeta insert korbo amra korbo newuser k(ekane doc newuser)




        // *** for get(READ of CRUD get data form the server and show it in the client UI)
        // database theke niya ashar jonno get korbo client theke niye ashar jonno post korbo route same prblm nai
        // database theke get kore then sheta send kore dibo client to show that in the UI
        // const cursor = movies.find(query, options);  // query holo dorkr onuyani select kore ana less than-10 airokom R options holo kon property gula nibo kibhabe sort hobe aigula
        // 
        app.get("/users", async(req, res) => {
            const cursor = UserCollections.find();
            const result = await cursor.toArray();
            res.send(result);
            console.log('getting data from database',result)
        })
        // then (http://localhost:5000/users) link e gele shob users gula akta array r vhitor peye jabo then 
        // use this url to the client to fetch and show it in client UI




       
        // *** Update korar jonno 2ta kaj korte hobe
        // 1. single data k niyye ashte hobe then form e boshaate hobe shetakei update(put kore) korte hobe
        // 2. update data taa k database e padhaate hobe through server
        // 3. and sekhan theke niye eshe updated data gula abar dekhate hobe client e get kore(lagbena age kora thakle)

        // get korte hole to r user theke kichu ana lage na signle data hole just local/server r API te dynamic id set korei hoy
        // tai link same thakbe just akta get(main.jsx e loader e korbo) arekta put(direct update component e fetch e method e)
        
        // for update (dynamic id diye single data k database theke anbo shei link k client e use korbo dynamic update click r id jonno)
        // id ta user/ pore akta id datbase theke niye manually boshaiye dekho shetar full data pao kina
        // pele shetake client r dynamci update cliciking r fetch e boshiye deo
        app.get("/users/:id",async(req,res)=>{
            // :id ta k reqeust diyei nite hobe
            const id = req.params.id;
            const query = { _id: new ObjectId(id)}
            // query/serch korar jonno akta unique id banate hobe
            // result e bole dilam ai query onujayi akta find koro
            const result = await UserCollections.findOne(query);
            // server r browser e dekhabo tai send korbo ai result k
            res.send(result);
        })
        // ***** client theke update btn click kore diye id k main.jsx e anchi (dynamic url r :id use kore)
        // R local manully dynamic id shoshiye id diye shei single full data anchi
        // shei server r data ta paacchi shei link/api(local host) k client e dynamic id diye call korbo ebaar instead of manual
        // so server e ordhek kaj kore AND client r half kaj kore 2ta k jora lagaici main.jsx e



        // 2.
        // put howate ekhane eshe hit korbe fetch dynamic url with dynamci id
        // ak e link diye padhacchi akta jabe get(r local api) arekta jabe put(update data ta) e coz method put
        app.put("/users/:id",async(req,res)=>{
            const id = req.params.id ;
            const user = req.body ;          
            // jei update kora user ta form r data theke pelam
            
            // filter(jeta change korbo shetake dhorbo),options(na thakle new kore add hobekina),set(ja update korbo)
            
            // ami jei id ta click e anchi shetar sathe datbase r id k match korabe
            const filter = { _id: new ObjectId(id)}
            // to create a document if no documents match the filter  update+insert = upsert 
            const options = {upsert:true};
            // to set what to be changed
            const Updateuser = {
                $set: {
                    email: user.email,
                    password: user.password
                }
            }
            // finally update that one data using these parameters
            const result = await UserCollections.updateOne(filter,Updateuser,options);
            res.send(result);
            // client side e padhiye dilam ai link k fetch korar response hishebe je fetch korche sheta ai response ta pabe
            // console.log(result);
        })
        




        // *** (POST) korar jonno data client theke niye just databse e set kore deo browser e dekhate hobe nah r GET(READ)
        // korte get use korbo shei link/url e data DB theke ene sheta server r browser e dekhabo then shei link niye
        // client e use korbo
        // client theke data anbo shetar jonno akta api banacchi server er ai link onuyai fetch kore padhiye dibo client theke server e
        // post hobe method karon client theke  anle sheta server r jonno post then sheta mongo teo rakhbo
        // (C-CRUD-CREATE) post korle post r ai route e ashbe
        app.post('/users', async (req, res) => {
            // req mane client theke jeta pabo/recieve korbo R res holo jeta padhabo (newuser form client form data)
            const Newuser = req.body;

            // *** inserting into database //
            const result = await UserCollections.insertOne(Newuser);

            res.send(result);
            // client e jabe data hishebe insert thik moto hole acknowledge true and akta unique id dekhabe result e
            // console.log(result);
        })





        // for delete operation (take clicked id from client then match with the database id and delete)
        app.delete('/users/:id',async(req,res)=>{
            const id = req.params.id;
            // res.send(id) XXX(kora jabe na just send ta result to confirm)
            // console.log(id);

            // database r _id r sathe jodi amr click kora id mile shetai deletekorbo certainly
            const query = { _id: new ObjectId(id) };
            const result = await UserCollections.deleteOne(query)
            res.send(result)
            // async korle await korte hobe
        })



        // optional
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        // ping/toka diye dekhbo server ta cholteche kina cholle ping ta k return pabo/korbe then colsole e bolbo
        // j connect hoice server mane ping return ashche R ping return na ashle await theme jabe r shamne jabe
        // na then direct final e chole giye client k close kore dibe (ping ta bad dileo prblm hobe na akhn)
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
        // function run hoye executed hoye jawar por mongodb r client connection object k close kore dibo
        // close na korte chaile ata k comment kore dibo
    }
}
run().catch(console.log);




// 
app.get('/', (req, res) => {
    res.send('Simple Crud is Running')
    // send na korle server r code k UI te dekhte pabo na ai port e
})

//
app.listen(port, () => {
    console.log(`server is running on ${port}`)
    // app ta kon port e code ta dekhabe listen korbe ta bola hoice
})