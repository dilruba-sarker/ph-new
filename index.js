// load catagories by id
const loadCategories = ()=>{
     fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res=>res.json()
    .then( data=>displayCategories(data.categories))
)
}
// show category button
const displayCategories = (categories)=>{
    
    const catrgoriesContainer= document.getElementById("catagories-container")
    categories.forEach((item) => {
       

        const buttonContainer=document.createElement("div")
    buttonContainer.innerHTML=
    `
    <button onclick="displayMatchVedio(${item.category_id})" id="id-${item.category_id}" class=" btn catrgory-btn">${item.category}</button>
    `
   
    catrgoriesContainer.append(buttonContainer)
    });
   
}
// remove class
const removeActiveAll =()=>{
   
    const catrgoryBtn =document.getElementsByClassName("catrgory-btn")

    for(let btn of catrgoryBtn){
        btn.classList.remove("active")
    }
}
// load match categoryid
// const displayMatchVedio = (category_id)=>{
//     fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${category_id}`)
//     .then(res =>res.json())
//     .then(data=>{
       
//         const activeBtn=document.getElementById(`id-${category_id}`)
//         removeActiveAll()
//         activeBtn.classList.add("active")
        
//         console.log(activeBtn);
//         displayVedioes(data.category)})
        
// }
// duplicate

// load match categoryid
const displayMatchVedio = (category_id) => {
    // Show the spinner
    const spinner = document.getElementById("spinner").querySelector(".loading");
    
    spinner.classList.remove("hidden");
    setTimeout(() => {
        
        fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${category_id}`)
        .then(res => res.json())
        .then(data => {
            const activeBtn = document.getElementById(`id-${category_id}`);
            removeActiveAll();
            activeBtn.classList.add("active");
            
            displayVedioes(data.category);
        })
        .finally(() => {
            // Hide the spinner after videos are loaded
            spinner.classList.add("hidden"); 
        }); 
    },1000);

    
}

// VEDIO LOADED
const vedioesLoaded = (searchText= " ") =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    // fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res =>res.json())
    .then(data=>displayVedioes(data.videos))
}
// show Vedios loaded
const displayVedioes=(videos)=>{
const vediosContainer = document.getElementById("vedios-container")
vediosContainer.innerHTML=' '
if(videos.length===0){
   
    vediosContainer.classList.remove("grid")
    vediosContainer.innerHTML=`
<div class=" min-h-screen flex flex-col gap-5 justify-center items-center">
<img src="asset/Icon.png"/>
<h2>No data found</h2>
</div>
`

return
}else{
    vediosContainer.classList.add("grid")
 
}

videos.forEach((video)=>{
    // console.log(video.video_id);
    const card = document.createElement('div')
    card.innerHTML=
    `<div class="rounded-xl shadow-xl">
  <figure class="h-[200px]">
    <img
      src="${video.thumbnail}"
      class="h-full w-full object-cover" />
  </figure>
  <div class="flex justify-center items-center gap-4 py-2">
  <div ><img class="h-10 w-10 rounded-full object-cover" src="${video.authors[0].profile_picture}" /></div>

  <h2 class=" font-bold">${video.title}</h2>

  </div>
  <div class="flex justify-center gap-5 items-center">
  <p>${video.authors[0].profile_name}</p>
  <div>
  ${video.authors[0].verified? `<img class="h-6" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/> ` : ' ' }
  

     </div>
  </div>
  <div class=" flex justify-center ">Views: ${video.others.views}</div>
 <div class="flex items-center justify-center"> <button onclick="detailsModal('${video.video_id}')" class="btn btn-sm bg-amber-500" >Details</button></div>

  </div>


</div>

    `
    vediosContainer.append(card)
})
}
const detailsModal=(video_id)=>{
// console.log(video_id);

fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`)
.then(res =>res.json())
.then(data=>showModal(data.video))
}

const showModal =(data)=>{
    console.log(data);
    const modalContainer=document.getElementById('modal-container')
    modalContainer.innerHTML=
    ` 
<dialog id="my_modal_2" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">${data.title}</h3>
   <img src="${data.thumbnail}"/>
  </div>
  <p>${data.description}</p>
</dialog>
    `
    my_modal_2.showModal()

}

document.getElementById("search-input").addEventListener("keyup",(e)=>{
    
    vedioesLoaded(e.target.value);
})
// sort by view
// document.getElementById("sort-btn").addEventListener("click",()=>{
//      fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
//     .then(res =>res.json())
//     .then(data=> sortedData(data.videos))
// })
// // convert k to 1000
// const convertThousands=(views)=>{
// if(views.includes("K")){
//     return parseFloat(views)*1000
// } return parseInt(views)
// }
// const sortedData=(allData)=>{
//   const sorted =  allData.sort((a,b)=>{convertThousands(b.others.views) - convertThousands(a.others.views)})
// console.log("sorted", sorted);
// }

document.getElementById("sort-btn").addEventListener("click", () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => sortedData(data.videos))
        .catch(error => console.error('Error:', error)); // Handle errors
});

const sortedData = (allData) => {
    // Step 1: Convert views to numeric values
    const sorted = allData.sort((a, b) => convertViews(b.others.views) - convertViews(a.others.views));
    
    // Step 2: Display the sorted data (you can modify this to display it on the web page)
    console.log('Sorted Videos:', sorted);
    
    // Optional: Update the DOM with sorted data
    
const vediosContainer = document.getElementById("vedios-container")
vediosContainer.innerHTML=' '
    sorted.forEach(element => {
        const videoElement = document.createElement('div');
        videoElement.innerHTML = 
        `<div class="rounded-xl shadow-xl">
        <figure class="h-[200px]">
          <img
            src="${element.thumbnail}"
            class="h-full w-full object-cover" />
        </figure>
        <div class="flex justify-center items-center gap-4 py-2">
        <div ><img class="h-10 w-10 rounded-full object-cover" src="${element.authors[0].profile_picture}" /></div>
      
        <h2 class=" font-bold">${element.title}</h2>
      
        </div>
        <div class="flex justify-center gap-5 items-center">
        <p>${element.authors[0].profile_name}</p>
        <div>
        ${element.authors[0].verified? `<img class="h-6" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/> ` : ' ' }
        
      
           </div>
        </div>
        <div class=" flex justify-center ">Views: ${element.others.views}</div>
       <div class="flex items-center justify-center"> <button onclick="detailsModal('${element.video_id}')" class="btn btn-sm bg-amber-500" >Details</button></div>
      
        </div>
      
      
      </div>
      
          `

        // `
        //     <img src="${element.thumbnail}" alt="Thumbnail" style="width: 100px; height: 100px;">
        //     <h3>${element.title}</h3>
        //     <p>Views: ${element.others.views}</p>
        //     <p>Author: ${element.authors[0].profile_name} (${element.authors[0].verified ? 'Verified' : 'Unverified'})</p>
        // `
        ;
        vediosContainer.appendChild(videoElement);
    });
};

// Helper function to convert view count (e.g., "113K" → 113000, "2.6K" → 2600)
const convertViews = (views) => {
    if (views.includes('K')) {
        return parseFloat(views) * 1000;
    }
    return parseInt(views);
};


// 
vedioesLoaded()
loadCategories()