import { useFirestore, useFirestoreCollectionData, useFirestoreDocData } from "reactfire";

export function useHeaderInfo() {
  const ref = useFirestore().collection("header").doc("main-info");
  return useFirestoreDocData(ref).data;
}

export function useDoc(collection, doc) {
  const ref = useFirestore().collection(collection).doc(doc);
  return useFirestoreDocData(ref);
}

export function useCollection(collection) {
  const ref = useFirestore().collection(collection);
  return useFirestoreCollectionData(ref, { idField: "id" });
}

// Más recientes primero; dentro del mismo año, por orden alfabético.
export const sortProjects = (list) =>
  [...(list || [])].sort(
    (a, b) => (b.year || 0) - (a.year || 0) || (a.title_es || "").localeCompare(b.title_es || ""),
  );
