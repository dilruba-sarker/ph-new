// {
//     "category_id": "1001",
//     "video_id": "aaah",
//     "thumbnail": "https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg",
//     "title": "Colors of the Wind",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/6r4cx4P/ethen-clack.png",
//             "profile_name": "Ethan Clark",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "233K",
//         "posted_date": "16090"
//     },
//     "description": "Ethan Clark's 'Colors of the Wind' is a vibrant musical exploration that captivates listeners with its rich, expressive melodies and uplifting rhythm. With 233K views, this song is a celebration of nature's beauty and human connection, offering a soothing and enriching experience for fans of heartfelt, nature-inspired music."
// }


// {
//     "category_id": "1001",
//     "video_id": "aaad",
//     "thumbnail": "https://i.ibb.co/f9FBQwz/smells.jpg",
//     "title": "Smells Like Teen Spirit",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/k4tkc42/oliviar-harris.jpg",
//             "profile_name": "Oliver Harris",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "5.4K",
//         "posted_date": "1672656000"
//     },
//     "description": "'Smells Like Teen Spirit' by Oliver Harris captures the raw energy and rebellious spirit of youth. With over 5.4K views, this track brings a grunge rock vibe, featuring powerful guitar riffs and compelling vocals. Oliver's verified profile guarantees a quality musical journey that resonates with fans of dynamic, high-energy performances."
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
    const container = document.getElementById('video-container'); // Assuming a container for video elements
    container.innerHTML = ''; // Clear the existing content

    sorted.forEach(element => {
        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
            <img src="${element.thumbnail}" alt="Thumbnail" style="width: 100px; height: 100px;">
            <h3>${element.title}</h3>
            <p>Views: ${element.others.views}</p>
            <p>Author: ${element.authors[0].profile_name} (${element.authors[0].verified ? 'Verified' : 'Unverified'})</p>
        `;
        container.appendChild(videoElement);
    });
};

// Helper function to convert view count (e.g., "113K" → 113000, "2.6K" → 2600)
const convertViews = (views) => {
    if (views.includes('K')) {
        return parseFloat(views) * 1000;
    }
    return parseInt(views);
};
