import { openDB } from "idb";

const initDb = async () =>
  openDB("jate_db", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate object store already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate object store created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error('putDb not implemented');

export const putDb = async (content) => {
  console.log("Post to the ase");
  const jate_db = await openDB("jate_db", 1);
  const tx = jate_db.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => console.error('getDb not implemented');
export const getDb = async () => {
  console.log("GET all from the database");
  const jate_db = await openDB("jate_db", 1);
  const tx = jate_db.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.get(1);
  const result = await request;
  console.log("result.value", result);
  // optional chaining
  return result?.value;
};

initDb();
