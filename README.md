

![alt text](https://s8.uupload.ir/files/todolist_h7xn.jpg)


### توضیحات پروژه 
پروژه با استفاده از vite و quasar ساخته شده است و طبق توضیحات تسک امکان اضافه، حذف و ویرایش کار ها را دارد همچنین قابلیت سرچ نیز اضافه شد. همه اطلاعات اضافه شده در local storage مرورگر ذخیره میشود و با اضافه و کم شدن هر مورد و تغییرات استیت، local storage نیز آپدیت میشود.


### کامپوننت ها
دو کامپوننت در نظر گرفتم [ToDoList](./src/components/ToDoList.vue) و  [ToDoItem](/src/components/ToDoItem.vue) که کامپوننت todolist اطلاعات لیست را دارد و toDoItem هر کدام از کار ها هست. کامپوننت ها را با composition api پیاده سازی کردم و برای ذخیره دیتاها از استور و local storage استفاده کردم.


### پیاده سازی
پس از پیاده سازی کامپوننت ها و طرح، استور را پیاده سازی کردم و برای اینکه بتونم در لحظه استور را در local storage آپدیت کنم از پلاگین های استور subscribe استفاده کردم 

```
plugins: [
    // used for updating store in local storage
    (store) => {
      store.subscribe((mutation, state) => {
        localStorage.setItem("store", JSON.stringify(state));
      });
    },
```



### استور
-استور با vuex پیاده سازی شد
-هر کدام از تسک ها سه فیلد id و text و done دارند
-برای جلوگیری از تکراری بودن id ها از id: Date.now() استفاده کردم

نمونه استیتی که در عکس نمایش داده شده:
```
{
"tasks":[{"id":1718882487005,"text":"کد نویسی تسک typescript","done":false},{"id":1718882490116,"text":"تست تسک ها ","done":true},{"id":1718882496613,"text":"test1","done":false}],
"searchText":""
}
```
همچنین برای خواندن و جایگزین کردن استیت از localStorage در main.js
```
const savedState = localStorage.getItem("store");
if (savedState) {
  store.replaceState(Object.assign(store.state, JSON.parse(savedState)));
}
```
همچنین اگر چندین تب داشتیم و در هر کدام تغییری داشتیم برای اینکه استیت یکسان باشد و مشکلات احتمالی نداشته باشیم

```
window.addEventListener("storage", (event) => {
  if (event.key === "store") {
    store.replaceState(Object.assign(store.state, JSON.parse(event.newValue)));
  }
});
```




### منابع
1. داکیومنت quasar: 
https://quasar.dev/

2. برای اینکه استور رو در localStorage آپدیت کنم:
https://stackoverflow.com/questions/68512129/how-to-save-state-variables-to-the-browser-localstorage-using-vue-js-vuex-c
