const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 16 + 'px';
    cursor.style.top = e.clientY - 16 + 'px';
});

const resources = {
    en: {
        translation: {
            exploreWorld: "Explore the World",
            discover: "Discover breathtaking destinations and unforgettable experiences across the globe",
            startExploring: "Start Exploring",
            santorini: "Santorini, Greece",
            santoriniDesc: "Experience the stunning white architecture and breathtaking sunsets of this Mediterranean paradise.",
            kyoto: "Kyoto, Japan",
            kyotoDesc: "Immerse yourself in ancient temples, traditional gardens, and authentic Japanese culture.",
            machuPicchu: "Machu Picchu, Peru",
            machuPicchuDesc: "Explore the ancient Incan citadel set high in the Andes Mountains.",
            learnMore: "Learn More"
        }
    },
    hi: {
        translation: {
            exploreWorld: "दुनिया का अन्वेषण करें",
            discover: "दुनिया भर में अविस्मरणीय अनुभवों के साथ शानदार स्थलों की खोज करें",
            startExploring: "अन्वेषण शुरू करें",
            santorini: "सांटोरिनी, ग्रीस",
            santoriniDesc: "इस भूमध्यसागरीय स्वर्ग के अद्वितीय सफेद वास्तुकला और शानदार सूर्यास्त का अनुभव करें।",
            kyoto: "क्योटो, जापान",
            kyotoDesc: "प्राचीन मंदिरों, पारंपरिक बागों और प्रामाणिक जापानी संस्कृति में डूब जाएं।",
            machuPicchu: "माचू पिचू, पेरू",
            machuPicchuDesc: "एंडीज पहाड़ों में स्थित इस प्राचीन इंका किले की खोज करें।",
            learnMore: "और जानें"
        }
    },
    mr: {
        translation: {
            exploreWorld: "दुनिया अन्वेषण करा",
            discover: "जगभरातील आश्चर्यकारक ठिकाणे आणि अविस्मरणीय अनुभव शोधा",
            startExploring: "शोधायला सुरूवात करा",
            santorini: "सांटोरिनी, ग्रीस",
            santoriniDesc: "या भूमध्य सागरातील स्वर्गातील सफेद वास्तुकला आणि अप्रतिम सूर्यास्ताचा अनुभव घ्या.",
            kyoto: "क्योटो, जपान",
            kyotoDesc: "प्राचीन मंदिरे, पारंपरिक बागा, आणि प्रामाणिक जपानी संस्कृतीत सामील व्हा.",
            machuPicchu: "माचू पिचू, पेरू",
            machuPicchuDesc: "अँडीस पर्वतांमध्ये वसलेले प्राचीन इंका किल्ले अन्वेषण करा.",
            learnMore: "अधिक जाणून घ्या"
        }
    },

    te: {
        translation: {
            exploreWorld: "ప్రపంచాన్ని అన్వేషించండి",
            discover: "ప్రపంచవ్యాప్తంగా అద్భుతమైన ప్రదేశాలు మరియు మరపురాని అనుభవాలను కనుగొనండి",
            startExploring: "అన్వేషణ ప్రారంభించండి",
            santorini: "సాంటోరిని, గ్రీస్",
            santoriniDesc: "ఈ మెడిటరేనియన్ స్వర్గంలో తెల్లని వాస్తుశిల్పం మరియు అద్భుతమైన సూర్యాస్తమయాలను ఆస్వాదించండి.",
            kyoto: "క్యోటో, జపాన్",
            kyotoDesc: "పురాతన ఆలయాలు, సంప్రదాయ ఉద్యానవనాలు మరియు ఆత్మీయ జపనీస్ సాంస్కృతికంలో మునిగిపోవండి.",
            machuPicchu: "మాచూ పిచ్చు, పెరూ",
            machuPicchuDesc: "ఆండీస్ పర్వతాల్లో ఉన్న పురాతన ఇన్కా కోటను అన్వేషించండి.",
            learnMore: "మరింత తెలుసుకోండి"
        }
    }
};

i18next.init({
    lng: "en",
    resources
}, function (err, t) {
    if (err) return console.error(err);
    updateContent();
});

function updateContent() {
    document.getElementById("explore-world").textContent = i18next.t('exploreWorld');
    document.getElementById("discover").textContent = i18next.t('discover');
    document.getElementById("explore-btn").textContent = i18next.t('startExploring');
    document.getElementById("santorini").textContent = i18next.t('santorini');
    document.getElementById("santorini-desc").textContent = i18next.t('santoriniDesc');
    document.getElementById("kyoto").textContent = i18next.t('kyoto');
    document.getElementById("kyoto-desc").textContent = i18next.t('kyotoDesc');
    document.getElementById("machu-picchu").textContent = i18next.t('machuPicchu');
    document.getElementById("machu-picchu-desc").textContent = i18next.t('machuPicchuDesc');
    document.getElementById("learn-more").textContent = i18next.t('learnMore');
    document.getElementById("learn-more2").textContent = i18next.t('learnMore');
    document.getElementById("learn-more3").textContent = i18next.t('learnMore');
}

function changeLanguage(lang) {
    i18next.changeLanguage(lang, updateContent);
}

// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globe-container').appendChild(renderer.domElement);

// Create Globe
const geometry = new THREE.SphereGeometry(5, 32, 32);
const material = new THREE.MeshPhongMaterial({
    color: 0x2196f3,
    wireframe: true,
    transparent: true,
    opacity: 0.8
});
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Add Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add Point Light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Position Camera
camera.position.z = 15;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate Globe
    globe.rotation.x += 0.001;
    globe.rotation.y += 0.002;

    renderer.render(scene, camera);
}

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start Animation
animate();

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
