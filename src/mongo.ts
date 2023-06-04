import { App, Credentials } from "realm-web";
export let collection: Realm.Services.MongoDB.MongoDBCollection<any>;
export const setupCollection = async () => {
  const app = new App({ id: "canildajonas-lgwzv" });
  const credentials = Credentials.anonymous();
  try {
    const user = await app.logIn(credentials);
    const mongo = user.mongoClient("mongodb-atlas");
    collection = mongo.db("CanilDaJonas").collection("Cages");
    return collection;
  } catch (err) {
    console.error("Failed to log in", err);
  }
};
