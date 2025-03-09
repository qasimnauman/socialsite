const urlPageTitle = "ConnecFriend";

loadData = async () => {
    const users = await fetch('data/userdata.json')
        .then(res => res.json())
        .catch(error => {
            console.error('Error:', error);
            return [];
        });

    const user = users.find(u => u.username === "qasim");

    if (user) {
        if (user.password === "qasim123") {
            globalState.userData = {
                time: new Date().toLocaleTimeString(),
                username: user.username,
                fullname: user.fullName,
                profession: user.profession,
                email: user.email,
                age: user.age,
                friends: user.friends,
                profilePicture: user.profilePicture
            };
        } else {
            document.getElementById('error-message').innerText = "Incorrect password";
            return;
        }
    } else {
        document.getElementById('error-message').innerText = "User not found";
        return;
    }

    let posts = await getPost('post1');
    let Post = posts[0];
    globalState.post1 = {
        author: Post.author,
        authorAvatar: Post.authorAvatar,
        content: Post.content,
        date: Post.time,
        image: Post.image,
        comments: Post.comments,
        likes: Post.likes,
        shares: Post.shares
    };

    posts = await getPost('post2');
    Post = posts[0];
    globalState.post2 = {
        author: Post.author,
        authorAvatar: Post.authorAvatar,
        content: Post.content,
        date: Post.time,
        image: Post.image,
        comments: Post.comments,
        likes: Post.likes,
        shares: Post.shares
    };

    posts = await getPost('post3');
    Post = posts[0];
    globalState.post3 = {
        author: Post.author,
        authorAvatar: Post.authorAvatar,
        content: Post.content,
        date: Post.time,
        image: Post.image,
        comments: Post.comments,
        likes: Post.likes,
        shares: Post.shares
    };

    posts = await getPost('post4');
    Post = posts[0];
    globalState.post4 = {
        author: Post.author,
        authorAvatar: Post.authorAvatar,
        content: Post.content,
        date: Post.time,
        image: Post.image,
        comments: Post.comments,
        likes: Post.likes,
        shares: Post.shares
    };

    posts = await getPost('post5');
    Post = posts[0];
    globalState.post5 = {
        author: Post.author,
        authorAvatar: Post.authorAvatar,
        content: Post.content,
        date: Post.time,
        image: Post.image,
        comments: Post.comments,
        likes: Post.likes,
        shares: Post.shares
    };

    console.log("Global Post1", globalState.post1);
    console.log("Global Post2", globalState.post2);
    console.log("Global Post3", globalState.post3);
    console.log("Global Post4", globalState.post4);
    console.log("Global Post5", globalState.post5);
};

getPost = async (post) => {
    return await fetch(`data/${post}.json`)
        .then(res => res.json())
        .catch(error => {
            console.error('Error:', error);
            return [];
        });
};

document.addEventListener('submit', async function (event) {
    if (event.target.matches('#myForm')) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');

        const users = await fetch('data/userdata.json')
            .then(res => res.json())
            .catch(error => console.error('Error:', error));

        const user = users.find(u => u.username === username);

        if (user) {
            if (user.password === password) {
                globalState.userData = {
                    time: new Date().toLocaleTimeString(),
                    username: user.username,
                    fullname: user.fullName,
                    email: user.email,
                    profession: user.profession,
                    age: user.age,
                    friends: user.friends,
                    profilePicture: user.profilePicture
                };
                console.log(globalState.userData);
                console.log('User logged in');
                window.location.hash = '#dashboard';
            } else {
                document.getElementById('error-message').innerText = "Incorrect password";
            }
        } else {
            document.getElementById('error-message').innerText = "User not found";
        }
    }
});

const hashLocationHandler = async () => {
    let path = window.location.hash.replace('#', '');
    if (!path) path = '/';

    const route = HashRoutes[path] || HashRoutes[404];

    try {
        let html = await fetch(route.template).then(res => res.text());

        // For #dashboard route
        if (path === 'dashboard') {
            if (globalState.post1) {
                Object.entries(globalState.post1).forEach(([key, value]) => {
                    const regex = new RegExp(`{{post1.${key}}}`, 'g');
                    html = html.replace(regex, value);
                });
            }
            if (globalState.post2) {
                Object.entries(globalState.post2).forEach(([key, value]) => {
                    const regex = new RegExp(`{{post2.${key}}}`, 'g');
                    html = html.replace(regex, value);
                });
            }
            if (globalState.post3) {
                Object.entries(globalState.post2).forEach(([key, value]) => {
                    const regex = new RegExp(`{{post3.${key}}}`, 'g');
                    html = html.replace(regex, value);
                });
            }
            if (globalState.post4) {
                Object.entries(globalState.post2).forEach(([key, value]) => {
                    const regex = new RegExp(`{{post4.${key}}}`, 'g');
                    html = html.replace(regex, value);
                });
            }
            if (globalState.post5) {
                Object.entries(globalState.post2).forEach(([key, value]) => {
                    const regex = new RegExp(`{{post5.${key}}}`, 'g');
                    html = html.replace(regex, value);
                });
            }
            const friends = globalState.userData.friends || {};
            Object.entries(globalState.userData).forEach(([key, value]) => {
                if (typeof value === 'object') {
                    // skip objects here if you want
                } else {
                    const regex = new RegExp(`{{${key}}}`, 'g');
                    html = html.replace(regex, value);
                }
            });
            Object.entries(friends).forEach(([key, value]) => {
                const regex = new RegExp(`{{${key}}}`, 'g');
                html = html.replace(regex, value);
            });

        }

        // For #profile route
        if (path === 'profile' && globalState.userData && Object.keys(globalState.userData).length > 0) {
            const friends = globalState.userData.friends || {};
            Object.entries(globalState.userData).forEach(([key, value]) => {
                if (typeof value === 'object') {
                    // skip objects here if you want
                } else {
                    const regex = new RegExp(`{{${key}}}`, 'g');
                    html = html.replace(regex, value);
                }
            });
            Object.entries(friends).forEach(([key, value]) => {
                const regex = new RegExp(`{{${key}}}`, 'g');
                html = html.replace(regex, value);
            });
        }

        document.getElementById('content').innerHTML = html;
        document.title = route.title;
    } catch (error) {
        console.error('Error fetching the template:', error);
    }
};

window.addEventListener('hashchange', hashLocationHandler);

window.addEventListener('load', async () => {

    hashLocationHandler();


    setTimeout(async () => {
        await loadData();
        hashLocationHandler();
    }, 200);
});

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav ul li a");
    const checkBox = document.getElementById("check");
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            checkBox.checked = false;
        });
    });
});

document.querySelectorAll('.dropdown-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
        e.preventDefault();
        var dropdown = this.nextElementSibling;
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
});

document.addEventListener('click', function (e) {
    document.querySelectorAll('.dropdown-menu').forEach(function (menu) {
        if (!menu.parentElement.contains(e.target)) {
            menu.style.display = 'none';
        }
    });
});
