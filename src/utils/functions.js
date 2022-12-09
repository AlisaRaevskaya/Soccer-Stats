 export const paginate = (competitions_items, currentPage, perPage) => {
   let from = currentPage.pageNumber * perPage - perPage;
   let to = currentPage.pageNumber * perPage;
   return competitions_items.slice(from, to);
 };

 export const filterPosts = (arr, str) => {
   let strLowCase = str.toLowerCase();
 
   let stringArray = arr.map((item) => (item = Object.values(item).join(",")));
 
   let results = stringArray.filter((post) =>
     post.toLowerCase().includes(strLowCase)
   );
   return results.map((element) => element.split(","));
 };