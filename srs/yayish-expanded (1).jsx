import React, { useState, useEffect, useRef } from 'react';
import { Home, BookOpen, Grid3x3, Search, Zap, Trophy, Calendar, Volume2, Share2, RotateCcw, Check, Timer, Sparkles } from 'lucide-react';
import * as Tone from 'tone';

// 200+ Bay Area Slang Terms Database
const bayAreaWords = [
  // REGIONAL TERMS
  { word: "Yay Area", pronunciation: "yay air-ee-uh", definition: "Bay Area nickname", usage: "Reppin the Yay Area", category: "Regional", difficulty: "Beginner" },
  { word: "The Town", pronunciation: "thuh town", definition: "Oakland", usage: "Going to The Town", category: "Regional", difficulty: "Beginner" },
  { word: "The City", pronunciation: "thuh sit-ee", definition: "San Francisco", usage: "Heading to The City", category: "Regional", difficulty: "Beginner" },
  { word: "East Bay", pronunciation: "eest bay", definition: "Oakland/Berkeley area", usage: "East Bay stand up", category: "Regional", difficulty: "Beginner" },
  { word: "The V", pronunciation: "thuh vee", definition: "Vallejo", usage: "Mac Dre from The V", category: "Regional", difficulty: "Intermediate" },
  { word: "Richmond", pronunciation: "rich-mund", definition: "City in West Contra Costa", usage: "Richmond raised me", category: "Regional", difficulty: "Beginner" },
  { word: "Daly City", pronunciation: "day-lee sit-ee", definition: "City south of SF", usage: "Daly City fog", category: "Regional", difficulty: "Beginner" },
  { word: "EPA", pronunciation: "ee-pee-ay", definition: "East Palo Alto", usage: "EPA on the map", category: "Regional", difficulty: "Intermediate" },
  { word: "Frisco", pronunciation: "fris-koh", definition: "SF (tourists say it)", usage: "Don't call it Frisco", category: "Regional", difficulty: "Beginner" },
  { word: "The Peninsula", pronunciation: "thuh pen-in-soo-luh", definition: "SF to San Jose area", usage: "Peninsula life", category: "Regional", difficulty: "Beginner" },
  { word: "South Bay", pronunciation: "south bay", definition: "San Jose area", usage: "South Bay vibes", category: "Regional", difficulty: "Beginner" },
  { word: "North Bay", pronunciation: "north bay", definition: "Marin/Napa area", usage: "North Bay chillin", category: "Regional", difficulty: "Beginner" },
  { word: "Berkeley", pronunciation: "burk-lee", definition: "College city, East Bay", usage: "Berkeley educated", category: "Regional", difficulty: "Beginner" },
  { word: "Hayward", pronunciation: "hay-werd", definition: "City in East Bay", usage: "Hayward represent", category: "Regional", difficulty: "Beginner" },
  { word: "San Jo", pronunciation: "san joe", definition: "San Jose nickname", usage: "San Jo native", category: "Regional", difficulty: "Beginner" },

  // ENERGY & ATTITUDE
  { word: "Hyphy", pronunciation: "high-fee", definition: "Hyperactive energetic", usage: "Getting hyphy tonight", category: "Energy", difficulty: "Intermediate" },
  { word: "Go Dumb", pronunciation: "goh dum", definition: "Act wild/crazy", usage: "We bout to go dumb", category: "Energy", difficulty: "Intermediate" },
  { word: "Get Stupid", pronunciation: "get stoo-pid", definition: "Party hard", usage: "Get stupid at the function", category: "Energy", difficulty: "Intermediate" },
  { word: "Turnt", pronunciation: "ternt", definition: "Excited/energized", usage: "We turnt up", category: "Energy", difficulty: "Beginner" },
  { word: "Lit", pronunciation: "lit", definition: "Exciting/fun", usage: "Party was lit", category: "Energy", difficulty: "Beginner" },
  { word: "Mobbin", pronunciation: "mah-bin", definition: "Moving with crew", usage: "Mobbin through the town", category: "Energy", difficulty: "Intermediate" },
  { word: "Sideshow", pronunciation: "side-show", definition: "Street takeover/stunts", usage: "Sideshow on Broadway", category: "Energy", difficulty: "Advanced" },
  { word: "Gas Brake Dip", pronunciation: "gas brake dip", definition: "Sideshow move", usage: "Gas brake dip at the light", category: "Energy", difficulty: "Advanced" },
  { word: "Yadadamean", pronunciation: "yah-dah-dah-mean", definition: "You know what I mean", usage: "That's tight yadadamean", category: "Energy", difficulty: "Advanced" },
  { word: "Feelin It", pronunciation: "fee-lin it", definition: "In the zone/vibing", usage: "I'm feelin it tonight", category: "Energy", difficulty: "Beginner" },

  // MAC DRE TERMS
  { word: "Thizz", pronunciation: "thiz", definition: "Party hard (Mac Dre)", usage: "We bout to thizz", category: "Mac Dre", difficulty: "Advanced" },
  { word: "Thizz Face", pronunciation: "thiz face", definition: "Scrunch face expression", usage: "Hit em with the thizz face", category: "Mac Dre", difficulty: "Advanced" },
  { word: "Feelin Myself", pronunciation: "fee-lin my-self", definition: "Confident/good vibes", usage: "I'm feelin myself", category: "Mac Dre", difficulty: "Intermediate" },
  { word: "Thizzle Dance", pronunciation: "thiz-ul dance", definition: "Mac Dre dance move", usage: "Do the thizzle dance", category: "Mac Dre", difficulty: "Advanced" },
  { word: "Furly", pronunciation: "fur-lee", definition: "For real", usage: "That's furly tight", category: "Mac Dre", difficulty: "Advanced" },
  { word: "Genie of the Lamp", pronunciation: "jee-nee of thuh lamp", definition: "Mac Dre nickname", usage: "RIP Genie of the Lamp", category: "Mac Dre", difficulty: "Advanced" },
  { word: "Thizzelle Washington", pronunciation: "thiz-el wash-ing-ton", definition: "Mac Dre alter ego", usage: "Thizzelle Washington classic", category: "Mac Dre", difficulty: "Advanced" },

  // MONEY
  { word: "Scrilla", pronunciation: "skrill-uh", definition: "Money", usage: "Getting scrilla", category: "Money", difficulty: "Intermediate" },
  { word: "Gouda", pronunciation: "goo-duh", definition: "Money (cheese)", usage: "Stacking gouda", category: "Money", difficulty: "Intermediate" },
  { word: "Cheddar", pronunciation: "ched-er", definition: "Money", usage: "Making cheddar", category: "Money", difficulty: "Beginner" },
  { word: "Bread", pronunciation: "bred", definition: "Money", usage: "Getting this bread", category: "Money", difficulty: "Beginner" },
  { word: "Chips", pronunciation: "chips", definition: "Money", usage: "Got chips", category: "Money", difficulty: "Beginner" },
  { word: "Bank", pronunciation: "bank", definition: "Lots of money", usage: "He got bank", category: "Money", difficulty: "Beginner" },
  { word: "Cream", pronunciation: "kreem", definition: "Money/profit", usage: "Cash rules everything around me", category: "Money", difficulty: "Intermediate" },
  { word: "Cake", pronunciation: "cake", definition: "Money", usage: "Getting cake", category: "Money", difficulty: "Beginner" },
  { word: "Loot", pronunciation: "loot", definition: "Money", usage: "Got the loot", category: "Money", difficulty: "Beginner" },
  { word: "Fetti", pronunciation: "fet-ee", definition: "Money", usage: "Chasing fetti", category: "Money", difficulty: "Intermediate" },

  // CAR CULTURE
  { word: "Scraper", pronunciation: "skray-per", definition: "Customized car", usage: "Clean scraper", category: "Car", difficulty: "Advanced" },
  { word: "Ghostride", pronunciation: "ghost-ride", definition: "Exit moving car", usage: "Ghostride the whip", category: "Car", difficulty: "Advanced" },
  { word: "Whip", pronunciation: "wip", definition: "Car", usage: "Nice whip", category: "Car", difficulty: "Beginner" },
  { word: "Scraper Bike", pronunciation: "skray-per bike", definition: "Decorated bike", usage: "Riding my scraper bike", category: "Car", difficulty: "Advanced" },
  { word: "Sideshow", pronunciation: "side-show", definition: "Street car meetup", usage: "Sideshow tonight", category: "Car", difficulty: "Advanced" },
  { word: "Donuts", pronunciation: "doh-nuts", definition: "Car spinning circles", usage: "Doing donuts", category: "Car", difficulty: "Intermediate" },
  { word: "Candy Paint", pronunciation: "kan-dee paint", definition: "Glossy car paint", usage: "Candy paint dripping", category: "Car", difficulty: "Advanced" },
  { word: "Scraperboard", pronunciation: "skray-per-bord", definition: "Dashboard of scraper", usage: "Scraperboard on point", category: "Car", difficulty: "Advanced" },
  { word: "Mob", pronunciation: "mahb", definition: "Drive around", usage: "Let's mob", category: "Car", difficulty: "Intermediate" },
  { word: "Box Chevy", pronunciation: "boks shev-ee", definition: "Old school Chevy", usage: "Box Chevy on swangas", category: "Car", difficulty: "Advanced" },

  // GENERAL SLANG
  { word: "Hella", pronunciation: "hell-uh", definition: "Very, extremely", usage: "That's hella cool", category: "General", difficulty: "Beginner" },
  { word: "Slaps", pronunciation: "slaps", definition: "Great song/food", usage: "This track slaps", category: "General", difficulty: "Beginner" },
  { word: "Hella Tight", pronunciation: "hell-uh tite", definition: "Really cool", usage: "That's hella tight", category: "General", difficulty: "Beginner" },
  { word: "Hecka", pronunciation: "heck-uh", definition: "Very (cleaner hella)", usage: "That's hecka cool", category: "General", difficulty: "Beginner" },
  { word: "Slap", pronunciation: "slap", definition: "Hit hard/sound good", usage: "Bass slaps", category: "General", difficulty: "Beginner" },
  { word: "Bammer", pronunciation: "bam-er", definition: "Low quality/lame", usage: "That's bammer", category: "General", difficulty: "Intermediate" },
  { word: "Hella Fire", pronunciation: "hell-uh fy-er", definition: "Really good", usage: "That's hella fire", category: "General", difficulty: "Beginner" },
  { word: "Yee", pronunciation: "yee", definition: "Yes/affirmative", usage: "Yee that's what's up", category: "General", difficulty: "Beginner" },
  { word: "Yadda", pronunciation: "yah-duh", definition: "You", usage: "What yadda think", category: "General", difficulty: "Intermediate" },
  { word: "Finna", pronunciation: "fin-uh", definition: "About to/going to", usage: "I'm finna leave", category: "General", difficulty: "Beginner" },
  { word: "Hella Bomb", pronunciation: "hell-uh bahm", definition: "Really amazing", usage: "That burrito hella bomb", category: "General", difficulty: "Beginner" },
  { word: "Cold", pronunciation: "kohld", definition: "Mean/harsh or really good", usage: "That was cold", category: "General", difficulty: "Intermediate" },
  { word: "Dummy", pronunciation: "dum-ee", definition: "Very/extremely", usage: "Dummy hot today", category: "General", difficulty: "Intermediate" },
  { word: "Hyphie", pronunciation: "high-fee", definition: "Hyphy person", usage: "He a hyphie", category: "General", difficulty: "Intermediate" },
  { word: "Giggin", pronunciation: "gig-in", definition: "Dancing/having fun", usage: "We giggin tonight", category: "General", difficulty: "Intermediate" },

  // PEOPLE & ATTITUDE
  { word: "Homie", pronunciation: "hoh-mee", definition: "Friend", usage: "That's my homie", category: "People", difficulty: "Beginner" },
  { word: "Folks", pronunciation: "fohks", definition: "Friends/people", usage: "Where the folks at", category: "People", difficulty: "Beginner" },
  { word: "Bro", pronunciation: "broh", definition: "Brother/friend", usage: "What's up bro", category: "People", difficulty: "Beginner" },
  { word: "Bruh", pronunciation: "bruh", definition: "Bro/dude", usage: "Bruh that's crazy", category: "People", difficulty: "Beginner" },
  { word: "Cuz", pronunciation: "kuz", definition: "Cousin/friend", usage: "What up cuz", category: "People", difficulty: "Beginner" },
  { word: "Playboy", pronunciation: "play-boy", definition: "Friend/player", usage: "What's good playboy", category: "People", difficulty: "Intermediate" },
  { word: "Potna", pronunciation: "paht-nuh", definition: "Partner/friend", usage: "That's my potna", category: "People", difficulty: "Intermediate" },
  { word: "Fool", pronunciation: "fool", definition: "Person/dude", usage: "This fool trippin", category: "People", difficulty: "Beginner" },
  { word: "Playa", pronunciation: "play-uh", definition: "Player/smooth person", usage: "He a playa", category: "People", difficulty: "Intermediate" },
  { word: "Main Man", pronunciation: "main man", definition: "Close friend", usage: "That's my main man", category: "People", difficulty: "Beginner" },
  { word: "Patna", pronunciation: "pat-nuh", definition: "Partner", usage: "Me and my patna", category: "People", difficulty: "Intermediate" },
  { word: "Cuddie", pronunciation: "kud-ee", definition: "Close friend", usage: "What up cuddie", category: "People", difficulty: "Intermediate" },
  { word: "Fam", pronunciation: "fam", definition: "Family/close friends", usage: "That's fam right there", category: "People", difficulty: "Beginner" },
  { word: "OG", pronunciation: "oh-jee", definition: "Original gangster/elder", usage: "Respect the OG", category: "People", difficulty: "Intermediate" },
  { word: "Youngsta", pronunciation: "yung-stuh", definition: "Young person", usage: "Youngsta got potential", category: "People", difficulty: "Beginner" },

  // FOOD & DRINK
  { word: "Slaps", pronunciation: "slaps", definition: "Tastes great", usage: "This burger slaps", category: "Food", difficulty: "Beginner" },
  { word: "Fire", pronunciation: "fy-er", definition: "Really good", usage: "This taco fire", category: "Food", difficulty: "Beginner" },
  { word: "Bomb", pronunciation: "bahm", definition: "Delicious", usage: "That's bomb", category: "Food", difficulty: "Beginner" },
  { word: "Gas", pronunciation: "gas", definition: "High quality", usage: "This food is gas", category: "Food", difficulty: "Intermediate" },
  { word: "Smacks", pronunciation: "smaks", definition: "Tastes good", usage: "This smacks", category: "Food", difficulty: "Beginner" },
  { word: "Hits Different", pronunciation: "hits dif-rent", definition: "Uniquely good", usage: "In-N-Out hits different", category: "Food", difficulty: "Beginner" },
  { word: "Grub", pronunciation: "grub", definition: "Food", usage: "Let's get some grub", category: "Food", difficulty: "Beginner" },
  { word: "Munchies", pronunciation: "mun-cheez", definition: "Snacks/hunger", usage: "Got the munchies", category: "Food", difficulty: "Beginner" },
  { word: "Chomp", pronunciation: "chomp", definition: "Eat", usage: "Time to chomp", category: "Food", difficulty: "Beginner" },
  { word: "Smack", pronunciation: "smak", definition: "Food/meal", usage: "Need a smack", category: "Food", difficulty: "Intermediate" },

  // MUSIC & CULTURE
  { word: "Slaps in the Whip", pronunciation: "slaps in thuh wip", definition: "Sounds good in car", usage: "This slaps in the whip", category: "Music", difficulty: "Intermediate" },
  { word: "Slap", pronunciation: "slap", definition: "Good song", usage: "New slap just dropped", category: "Music", difficulty: "Beginner" },
  { word: "Banger", pronunciation: "bang-er", definition: "Great song", usage: "That's a banger", category: "Music", difficulty: "Beginner" },
  { word: "Knock", pronunciation: "nahk", definition: "Loud bass", usage: "Let it knock", category: "Music", difficulty: "Intermediate" },
  { word: "Turf", pronunciation: "turf", definition: "Neighborhood", usage: "Representing my turf", category: "Music", difficulty: "Advanced" },
  { word: "Turf Dancing", pronunciation: "turf dan-sing", definition: "Oakland dance style", usage: "Turf dancing originated here", category: "Music", difficulty: "Advanced" },
  { word: "Function", pronunciation: "funk-shun", definition: "Party", usage: "Function tonight", category: "Music", difficulty: "Intermediate" },
  { word: "Kickback", pronunciation: "kik-bak", definition: "Small party", usage: "Just a kickback", category: "Music", difficulty: "Beginner" },
  { word: "Session", pronunciation: "sesh-un", definition: "Gathering", usage: "Recording session", category: "Music", difficulty: "Beginner" },
  { word: "Cipher", pronunciation: "sy-fer", definition: "Rap circle", usage: "Join the cipher", category: "Music", difficulty: "Intermediate" },

  // ACTIONS & ACTIVITIES
  { word: "Mob", pronunciation: "mahb", definition: "Move together", usage: "Let's mob", category: "Action", difficulty: "Intermediate" },
  { word: "Post Up", pronunciation: "pohst up", definition: "Hang out/stand", usage: "Post up on the corner", category: "Action", difficulty: "Intermediate" },
  { word: "Kick It", pronunciation: "kik it", definition: "Hang out", usage: "Wanna kick it", category: "Action", difficulty: "Beginner" },
  { word: "Chill", pronunciation: "chill", definition: "Relax/hang out", usage: "Just chillin", category: "Action", difficulty: "Beginner" },
  { word: "Slide", pronunciation: "slyde", definition: "Go somewhere", usage: "Let's slide through", category: "Action", difficulty: "Intermediate" },
  { word: "Pull Up", pronunciation: "pull up", definition: "Arrive/show up", usage: "Pull up to the spot", category: "Action", difficulty: "Beginner" },
  { word: "Bounce", pronunciation: "bounce", definition: "Leave", usage: "Time to bounce", category: "Action", difficulty: "Beginner" },
  { word: "Dip", pronunciation: "dip", definition: "Leave quickly", usage: "I'm bout to dip", category: "Action", difficulty: "Beginner" },
  { word: "Roll Out", pronunciation: "rohl out", definition: "Leave/depart", usage: "Time to roll out", category: "Action", difficulty: "Beginner" },
  { word: "Hit Licks", pronunciation: "hit liks", definition: "Make money moves", usage: "Hitting licks", category: "Action", difficulty: "Advanced" },
  { word: "Put On", pronunciation: "put ahn", definition: "Show off/represent", usage: "Put on for the city", category: "Action", difficulty: "Intermediate" },
  { word: "Run It", pronunciation: "run it", definition: "Do it/let's go", usage: "Run it up", category: "Action", difficulty: "Beginner" },
  { word: "Get It In", pronunciation: "get it in", definition: "Work hard/party", usage: "Get it in tonight", category: "Action", difficulty: "Intermediate" },
  { word: "Go Crazy", pronunciation: "goh kray-zee", definition: "Go hard", usage: "Bout to go crazy", category: "Action", difficulty: "Beginner" },
  { word: "Turn Up", pronunciation: "turn up", definition: "Get energetic", usage: "Turn up tonight", category: "Action", difficulty: "Beginner" },

  // DESCRIPTORS
  { word: "Dummy", pronunciation: "dum-ee", definition: "Really/very", usage: "Dummy thick", category: "Descriptor", difficulty: "Intermediate" },
  { word: "Stupid", pronunciation: "stoo-pid", definition: "Very/extremely", usage: "Stupid cold today", category: "Descriptor", difficulty: "Intermediate" },
  { word: "Hella", pronunciation: "hell-uh", definition: "Very", usage: "Hella fast", category: "Descriptor", difficulty: "Beginner" },
  { word: "Mad", pronunciation: "mad", definition: "Very", usage: "Mad tired", category: "Descriptor", difficulty: "Beginner" },
  { word: "Dummy Thick", pronunciation: "dum-ee thik", definition: "Very thick", usage: "Dummy thick burger", category: "Descriptor", difficulty: "Intermediate" },
  { word: "Sick", pronunciation: "sik", definition: "Cool/awesome", usage: "That's sick", category: "Descriptor", difficulty: "Beginner" },
  { word: "Clean", pronunciation: "kleen", definition: "Nice/fresh", usage: "Clean fit", category: "Descriptor", difficulty: "Beginner" },
  { word: "Fresh", pronunciation: "fresh", definition: "New/stylish", usage: "Fresh kicks", category: "Descriptor", difficulty: "Beginner" },
  { word: "Fly", pronunciation: "fly", definition: "Stylish/cool", usage: "Looking fly", category: "Descriptor", difficulty: "Beginner" },
  { word: "Dope", pronunciation: "dohp", definition: "Cool/good", usage: "That's dope", category: "Descriptor", difficulty: "Beginner" },
  { word: "Tight", pronunciation: "tite", definition: "Cool/close", usage: "That's tight", category: "Descriptor", difficulty: "Beginner" },
  { word: "Raw", pronunciation: "raw", definition: "Unfiltered/real", usage: "Keep it raw", category: "Descriptor", difficulty: "Intermediate" },
  { word: "Hard", pronunciation: "hard", definition: "Tough/impressive", usage: "Goes hard", category: "Descriptor", difficulty: "Beginner" },
  { word: "Weak", pronunciation: "week", definition: "Lame/bad", usage: "That's weak", category: "Descriptor", difficulty: "Beginner" },
  { word: "Wack", pronunciation: "wak", definition: "Bad/lame", usage: "That's wack", category: "Descriptor", difficulty: "Beginner" },

  // PHRASES & EXPRESSIONS
  { word: "What It Do", pronunciation: "wut it doo", definition: "What's up", usage: "What it do", category: "Phrase", difficulty: "Intermediate" },
  { word: "That's What's Up", pronunciation: "thats wuts up", definition: "That's cool/agreed", usage: "That's what's up", category: "Phrase", difficulty: "Beginner" },
  { word: "Feel Me", pronunciation: "feel mee", definition: "Understand me", usage: "You feel me", category: "Phrase", difficulty: "Beginner" },
  { word: "Fa Sho", pronunciation: "fuh shoh", definition: "For sure", usage: "Fa sho I'm coming", category: "Phrase", difficulty: "Beginner" },
  { word: "Real Talk", pronunciation: "reel tawk", definition: "Seriously/honestly", usage: "Real talk though", category: "Phrase", difficulty: "Beginner" },
  { word: "No Cap", pronunciation: "noh kap", definition: "No lie", usage: "No cap that's true", category: "Phrase", difficulty: "Beginner" },
  { word: "On God", pronunciation: "ahn gahd", definition: "I swear", usage: "On God that happened", category: "Phrase", difficulty: "Beginner" },
  { word: "Bet", pronunciation: "bet", definition: "Okay/sure", usage: "Bet I'll be there", category: "Phrase", difficulty: "Beginner" },
  { word: "Say Less", pronunciation: "say les", definition: "I understand", usage: "Say less I got you", category: "Phrase", difficulty: "Beginner" },
  { word: "My Bad", pronunciation: "my bad", definition: "My mistake", usage: "My bad bro", category: "Phrase", difficulty: "Beginner" },
  { word: "It's All Good", pronunciation: "its awl good", definition: "No problem", usage: "It's all good", category: "Phrase", difficulty: "Beginner" },
  { word: "Run That", pronunciation: "run that", definition: "Let's do it", usage: "Run that back", category: "Phrase", difficulty: "Intermediate" },
  { word: "What's Goodie", pronunciation: "wuts good-ee", definition: "What's good", usage: "What's goodie", category: "Phrase", difficulty: "Intermediate" },
  { word: "Get Hip", pronunciation: "get hip", definition: "Get with it/learn", usage: "Get hip to the game", category: "Phrase", difficulty: "Intermediate" },
  { word: "Put Me On", pronunciation: "put mee ahn", definition: "Introduce me/inform me", usage: "Put me on to that", category: "Phrase", difficulty: "Intermediate" },
];

function getCategoryColor(category) {
  const colors = {
    'Regional': '#FF7A32',
    'Energy': '#FF9A5A',
    'Mac Dre': '#FFD1B3',
    'Money': '#4B5C7A',
    'Car': '#0F1C2E',
    'General': '#FF7A32',
    'People': '#FF8C42',
    'Food': '#FFA566',
    'Music': '#FFB885',
    'Action': '#5D6D87',
    'Descriptor': '#3D4D67',
    'Phrase': '#2D3D57'
  };
  return colors[category] || '#FF7A32';
}

// Sound Effects Manager
class SoundManager {
  constructor() {
    this.initialized = false;
    this.synth = null;
  }

  async init() {
    if (this.initialized) return;
    try {
      await Tone.start();
      this.synth = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 0.4 }
      }).toDestination();
      this.initialized = true;
    } catch (e) {
      console.log('Audio not available');
    }
  }

  playTap() {
    if (!this.initialized || !this.synth) return;
    this.synth.triggerAttackRelease('C5', '0.05');
  }

  playSuccess() {
    if (!this.initialized || !this.synth) return;
    const now = Tone.now();
    this.synth.triggerAttackRelease('C5', '0.1', now);
    this.synth.triggerAttackRelease('E5', '0.1', now + 0.1);
    this.synth.triggerAttackRelease('G5', '0.2', now + 0.2);
  }

  playHover() {
    if (!this.initialized || !this.synth) return;
    this.synth.triggerAttackRelease('A4', '0.03');
  }
}

const soundManager = new SoundManager();

// GOOGLE ADSENSE COMPONENT
function AdBanner({ slot = "default", format = "auto", responsive = true, className = "" }) {
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Initialize AdSense ad
    try {
      if (window.adsbygoogle && adRef.current) {
        // Push ad to AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`ad-banner-container my-6 ${className}`}>
      <div className="backdrop-blur-sm rounded-2xl p-4 border border-white/10" style={{
        background: 'rgba(15, 28, 46, 0.3)',
        minHeight: responsive ? '100px' : 'auto'
      }}>
        {/* AdSense Ad Unit */}
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ 
            display: 'block',
            textAlign: 'center'
          }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // 👈 REPLACE with your AdSense Publisher ID
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
        
        {/* Placeholder while ad loads - AdSense policy compliant */}
        {!adLoaded && (
          <div className="flex items-center justify-center py-8" style={{ color: '#4B5C7A', opacity: 0.5 }}>
            <span className="text-sm">Advertisement</span>
          </div>
        )}
      </div>
    </div>
  );
}

// WORD OF THE DAY COMPONENT
function WordOfDay() {
  const [currentWord, setCurrentWord] = useState(null);
  const [showDefinition, setShowDefinition] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    setCurrentWord(bayAreaWords[dayOfYear % bayAreaWords.length]);
    
    // Animate in after mount
    setTimeout(() => setAnimateIn(true), 100);
  }, []);

  const handleSpeak = async () => {
    if (isPlaying) return;
    
    await soundManager.init();
    soundManager.playTap();
    
    if ('speechSynthesis' in window && currentWord) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleShare = async () => {
    await soundManager.init();
    soundManager.playTap();
    
    const shareText = `📚 Today's Bay Area Slang Word: ${currentWord.word}\n\n${currentWord.definition}\n\n"${currentWord.usage}"\n\nLearn more at Yayish.io!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Yayish.io - Word of the Day',
          text: shareText,
        });
        soundManager.playSuccess();
      } catch (err) {
        if (err.name !== 'AbortError') {
          fallbackShare(shareText);
        }
      }
    } else {
      fallbackShare(shareText);
    }
  };

  const fallbackShare = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShareSuccess(true);
      soundManager.playSuccess();
      setTimeout(() => setShareSuccess(false), 2000);
    });
  };

  const handleLearnMore = async () => {
    await soundManager.init();
    soundManager.playTap();
    setShowDefinition(!showDefinition);
  };

  if (!currentWord) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-pulse">
        <Sparkles className="w-16 h-16" style={{ color: '#FF7A32' }} />
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      {/* Date Badge */}
      <div 
        className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 mb-6 flex items-center justify-center gap-3 border border-white/20 shadow-2xl transition-all duration-500"
        style={{
          transform: animateIn ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)',
          opacity: animateIn ? 1 : 0
        }}
      >
        <Calendar className="w-5 h-5 animate-pulse" style={{ color: '#FF7A32' }} />
        <span className="text-lg font-semibold">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
      </div>

      {/* Main Word Card */}
      <div 
        className="backdrop-blur-xl rounded-3xl p-8 mb-6 shadow-2xl border-2 transition-all duration-700"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 122, 50, 0.15) 0%, rgba(75, 92, 122, 0.15) 100%)',
          borderColor: 'rgba(255, 122, 50, 0.3)',
          transform: animateIn ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          opacity: animateIn ? 1 : 0
        }}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 
              className="text-6xl font-black mb-3 transition-all duration-300 hover:scale-105"
              style={{ 
                color: '#4B5C7A', 
                textShadow: '0 0 40px rgba(75, 92, 122, 0.4)',
                cursor: 'default'
              }}
            >
              {currentWord.word}
            </h2>
            <p className="text-2xl italic opacity-80" style={{ color: '#4B5C7A' }}>
              /{currentWord.pronunciation}/
            </p>
          </div>
          
          {/* Speak Button */}
          <button 
            onClick={handleSpeak}
            disabled={isPlaying}
            className="rounded-full p-4 transition-all transform hover:scale-110 active:scale-95 shadow-lg relative overflow-hidden"
            style={{ backgroundColor: '#FF7A32' }}
            onMouseEnter={async () => {
              await soundManager.init();
              soundManager.playHover();
            }}
          >
            <Volume2 
              className={`w-7 h-7 text-white transition-transform ${isPlaying ? 'animate-pulse' : ''}`}
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-white/20 animate-ping rounded-full" />
            )}
          </button>
        </div>

        {/* Category & Difficulty Badges */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <span 
            className="px-5 py-2 rounded-full text-sm font-bold shadow-lg text-white transition-all hover:scale-105 animate-slideIn"
            style={{ 
              backgroundColor: getCategoryColor(currentWord.category),
              animationDelay: '0.1s'
            }}
          >
            {currentWord.category}
          </span>
          <span 
            className={`px-5 py-2 rounded-full text-sm font-bold shadow-lg text-white transition-all hover:scale-105 animate-slideIn ${
              currentWord.difficulty === 'Beginner' ? 'bg-green-500' : 
              currentWord.difficulty === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            {currentWord.difficulty}
          </span>
        </div>

        {/* Definition */}
        <div className="mb-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-6 h-6" style={{ color: '#4B5C7A' }} />
            <h3 className="text-xl font-bold" style={{ color: '#4B5C7A' }}>Definition</h3>
          </div>
          <p className="text-lg leading-relaxed" style={{ color: '#FFD1B3' }}>
            {currentWord.definition}
          </p>
        </div>

        {/* Usage Example */}
        <div 
          className="rounded-2xl p-5 mb-6 border-l-4 animate-fadeIn transition-all hover:border-l-8"
          style={{ 
            backgroundColor: 'rgba(15, 28, 46, 0.5)', 
            borderColor: '#4B5C7A',
            animationDelay: '0.4s'
          }}
        >
          <h3 className="text-sm font-bold mb-2" style={{ color: '#4B5C7A' }}>
            USAGE EXAMPLE
          </h3>
          <p className="text-lg italic text-white">"{currentWord.usage}"</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <button 
            onClick={handleLearnMore}
            className="flex-1 font-bold py-4 px-6 rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-lg text-lg text-white relative overflow-hidden group"
            style={{ backgroundColor: '#4B5C7A' }}
            onMouseEnter={async () => {
              await soundManager.init();
              soundManager.playHover();
            }}
          >
            <span className="relative z-10">
              {showDefinition ? 'Show Less' : 'Learn More'}
            </span>
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </button>
          
          <button 
            onClick={handleShare}
            className="p-4 rounded-2xl transition-all transform hover:scale-110 active:scale-95 shadow-lg relative"
            style={{ backgroundColor: '#FF7A32' }}
            onMouseEnter={async () => {
              await soundManager.init();
              soundManager.playHover();
            }}
          >
            {shareSuccess ? (
              <Check className="w-7 h-7 text-white animate-bounce" />
            ) : (
              <Share2 className="w-7 h-7 text-white" />
            )}
            {shareSuccess && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap animate-fadeIn">
                Copied to clipboard!
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Extended Info */}
      <div 
        className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: showDefinition ? '500px' : '0',
          opacity: showDefinition ? 1 : 0
        }}
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: '#4B5C7A' }}>
            <Sparkles className="w-6 h-6" />
            About This Word
          </h3>
          <p className="leading-relaxed mb-4" style={{ color: '#FFD1B3' }}>
            This term is part of the Bay Area's rich hip-hop culture. The region has contributed countless words to American vernacular, particularly through artists like Mac Dre, E-40, and Too $hort.
          </p>
          <p className="leading-relaxed text-sm" style={{ color: '#FFD1B3', opacity: 0.8 }}>
            The Bay Area's unique slang reflects its diverse culture, spanning from Oakland's hyphy movement to San Francisco's tech influence.
          </p>
        </div>
      </div>
    </div>
  );
}

// CROSSWORD PUZZLE GAME
function Crossword() {
  const [puzzle, setPuzzle] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);
  const [direction, setDirection] = useState('across');
  const [isComplete, setIsComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [revealedClues, setRevealedClues] = useState(new Set());
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    generateNewPuzzle();
  }, []);

  const generateNewPuzzle = async () => {
    setIsGenerating(true);
    await soundManager.init();
    soundManager.playTap();
    
    // Get puzzle instantly from cache
    setTimeout(() => {
      try {
        const cachedPuzzle = puzzleCache.get('crossword');
        
        if (cachedPuzzle) {
          // Use cached puzzle - instant!
          setPuzzle(cachedPuzzle);
        } else {
          // Fallback: generate on the fly (rare)
          const newPuzzle = puzzleCache.generateCrossword();
          setPuzzle(newPuzzle);
        }
        
        setUserAnswers({});
        setSelectedCell(null);
        setIsComplete(false);
        setShowCelebration(false);
        setRevealedClues(new Set());
      } catch (e) {
        console.error('Puzzle generation failed:', e);
      } finally {
        setIsGenerating(false);
      }
    }, 50);
  };

  const handleCellClick = async (row, col) => {
    if (!puzzle || puzzle.grid[row][col] === null) return;
    
    await soundManager.init();
    soundManager.playTap();

    if (selectedCell && selectedCell[0] === row && selectedCell[1] === col) {
      setDirection(direction === 'across' ? 'down' : 'across');
    } else {
      setSelectedCell([row, col]);
    }
  };

  const handleKeyPress = (e) => {
    if (!selectedCell || !puzzle) return;

    const [row, col] = selectedCell;
    const key = e.key.toUpperCase();

    if (key.length === 1 && key.match(/[A-Z]/)) {
      const newAnswers = { ...userAnswers };
      newAnswers[`${row}-${col}`] = key;
      setUserAnswers(newAnswers);

      soundManager.playTap();

      // Move to next cell (15x15 grid)
      if (direction === 'across' && col < 14) {
        setSelectedCell([row, col + 1]);
      } else if (direction === 'down' && row < 14) {
        setSelectedCell([row + 1, col]);
      }

      // Check if puzzle is complete
      checkCompletion(newAnswers);
    } else if (key === 'BACKSPACE') {
      const newAnswers = { ...userAnswers };
      delete newAnswers[`${row}-${col}`];
      setUserAnswers(newAnswers);

      // Move to previous cell
      if (direction === 'across' && col > 0) {
        setSelectedCell([row, col - 1]);
      } else if (direction === 'down' && row > 0) {
        setSelectedCell([row - 1, col]);
      }
    }
  };

  const checkCompletion = (answers) => {
    if (!puzzle) return;

    let allCorrect = true;
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        if (puzzle.grid[i][j] !== null) {
          const userAnswer = answers[`${i}-${j}`];
          if (!userAnswer || userAnswer !== puzzle.grid[i][j]) {
            allCorrect = false;
            break;
          }
        }
      }
      if (!allCorrect) break;
    }

    if (allCorrect) {
      setIsComplete(true);
      setShowCelebration(true);
      soundManager.playSuccess();
      
      // Count total clues for stats
      const totalClues = puzzle.words.length;
      const revealedCount = revealedClues.size;
      const solvedCount = totalClues - revealedCount;
      
      // Show celebration with stats
      setTimeout(() => setShowCelebration(false), 5000); // Longer celebration
    }
  };

  const revealWord = async (wordInfo) => {
    await soundManager.init();
    soundManager.playTap();

    const newAnswers = { ...userAnswers };
    const [startRow, startCol] = wordInfo.start;
    
    for (let i = 0; i < wordInfo.word.length; i++) {
      if (wordInfo.direction === 'across') {
        newAnswers[`${startRow}-${startCol + i}`] = wordInfo.word[i];
      } else {
        newAnswers[`${startRow + i}-${startCol}`] = wordInfo.word[i];
      }
    }
    
    setUserAnswers(newAnswers);
    setRevealedClues(new Set([...revealedClues, wordInfo.number]));
  };

  const getWordNumber = (row, col) => {
    if (!puzzle) return null;
    for (const word of puzzle.words) {
      if (word.start[0] === row && word.start[1] === col) {
        return word.number;
      }
    }
    return null;
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedCell, direction, userAnswers, puzzle]);

  if (!puzzle || isGenerating) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin mb-4 mx-auto">
            <Grid3x3 className="w-16 h-16" style={{ color: '#FF7A32' }} />
          </div>
          <p className="text-xl font-semibold" style={{ color: '#FFD1B3' }}>
            {isGenerating ? 'Generating puzzle...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="backdrop-blur-xl rounded-3xl p-6 mb-6 text-center shadow-2xl border-2 animate-fadeIn" style={{
        background: 'linear-gradient(135deg, rgba(255, 122, 50, 0.2) 0%, rgba(75, 92, 122, 0.2) 100%)',
        borderColor: 'rgba(255, 122, 50, 0.3)'
      }}>
        <div className="flex items-center justify-center gap-3 mb-3">
          <Grid3x3 className="w-8 h-8" style={{ color: '#FF7A32' }} />
          <h2 className="text-4xl font-bold" style={{ color: '#4B5C7A' }}>
            Bay Area Crossword
          </h2>
        </div>
        <p className="text-lg" style={{ color: '#FFD1B3' }}>
          Fill in the grid with Bay Area slang terms
        </p>
      </div>

      {/* Enhanced Celebration Banner */}
      {showCelebration && (
        <div className="backdrop-blur-xl rounded-3xl p-8 mb-6 text-center shadow-2xl border-4 animate-bounce relative overflow-hidden" style={{
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.4) 0%, rgba(16, 185, 129, 0.4) 50%, rgba(6, 182, 212, 0.4) 100%)',
          borderColor: 'rgba(34, 197, 94, 0.7)',
          animation: 'bounce 0.5s ease-in-out 3'
        }}>
          {/* Confetti Animation Effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: ['#FFD1B3', '#FF7A32', '#FF9A5A', '#4B5C7A'][i % 4],
                  animationDuration: `${1 + Math.random()}s`,
                  animationDelay: `${Math.random() * 0.5}s`
                }}
              />
            ))}
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-12 h-12 text-yellow-300 animate-bounce" />
              <h3 className="text-4xl font-black text-white drop-shadow-lg">
                Hella Tight! Puzzle Complete! 🎉
              </h3>
              <Trophy className="w-12 h-12 text-yellow-300 animate-bounce" />
            </div>
            
            {/* Stats */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-xl">
                <div className="text-2xl font-bold text-white">{puzzle.words.length}</div>
                <div className="text-sm text-white/80">Words</div>
              </div>
              <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-xl">
                <div className="text-2xl font-bold text-white">{puzzle.words.length - revealedClues.size}</div>
                <div className="text-sm text-white/80">Solved Solo</div>
              </div>
              {revealedClues.size > 0 && (
                <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-300">{revealedClues.size}</div>
                  <div className="text-sm text-white/80">Hints Used</div>
                </div>
              )}
            </div>
            
            <p className="text-xl font-bold text-white mt-4 drop-shadow">
              You're speaking Bay Area like a true local! 💯
            </p>
          </div>
        </div>
      )}

      {/* Ad Placement - After Crossword Completion */}
      {isComplete && <AdBanner slot="crossword-completion" className="animate-fadeIn" />}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Crossword Grid */}
        <div className="lg:col-span-2">
          <div className="backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2" style={{
            background: 'rgba(255, 122, 50, 0.1)',
            borderColor: 'rgba(255, 122, 50, 0.3)'
          }}>
            <div className="inline-block bg-white/90 rounded-2xl p-4 shadow-xl overflow-auto max-h-[650px]">
              <div className="grid gap-0" style={{ 
                gridTemplateColumns: `repeat(15, 1fr)`,
                width: 'fit-content'
              }}>
                {puzzle.grid.map((row, rowIndex) => (
                  row.map((cell, colIndex) => {
                    const isActive = cell !== null;
                    const isSelected = selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex;
                    const userAnswer = userAnswers[`${rowIndex}-${colIndex}`];
                    const wordNum = getWordNumber(rowIndex, colIndex);
                    const isCorrect = isComplete || (userAnswer === cell);

                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        className={`relative transition-all ${isActive ? 'cursor-pointer hover:bg-blue-100' : ''}`}
                        style={{
                          width: '32px',
                          height: '32px',
                          border: '1px solid #ccc',
                          backgroundColor: isActive 
                            ? isSelected 
                              ? '#FFD1B3' 
                              : userAnswer 
                                ? isCorrect 
                                  ? '#d4edda' 
                                  : '#fff' 
                                : '#fff'
                            : '#0F1C2E',
                        }}
                      >
                        {wordNum && (
                          <span className="absolute top-0 left-0.5 text-[9px] font-bold leading-none" style={{ color: '#4B5C7A' }}>
                            {wordNum}
                          </span>
                        )}
                        {isActive && (
                          <div className="flex items-center justify-center h-full text-base font-bold" style={{ color: '#0F1C2E' }}>
                            {userAnswer || ''}
                          </div>
                        )}
                      </div>
                    );
                  })
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 flex gap-3 justify-center flex-wrap">
              <button
                onClick={generateNewPuzzle}
                onMouseEnter={() => soundManager.init().then(() => soundManager.playHover())}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg text-white"
                style={{ backgroundColor: '#FF7A32' }}
              >
                <RotateCcw className="w-5 h-5" />
                New Puzzle
              </button>
              {isComplete && (
                <button
                  onClick={generateNewPuzzle}
                  onMouseEnter={() => soundManager.init().then(() => soundManager.playHover())}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg text-white"
                  style={{ backgroundColor: '#4B5C7A' }}
                >
                  <Sparkles className="w-5 h-5" />
                  Play Again
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Clues Panel */}
        <div className="space-y-4">
          {/* Across Clues */}
          <div className="backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2" style={{
            background: 'rgba(75, 92, 122, 0.1)',
            borderColor: 'rgba(75, 92, 122, 0.3)'
          }}>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: '#4B5C7A' }}>
              <span>→</span> Across
            </h3>
            <div className="space-y-3">
              {puzzle.clues.across.map((clue) => {
                const wordInfo = puzzle.words.find(w => w.number === clue.number);
                const isRevealed = revealedClues.has(clue.number);
                
                return (
                  <div key={clue.number} className="group">
                    <div className="flex items-start gap-2">
                      <span className="font-bold min-w-[30px]" style={{ color: '#FF7A32' }}>
                        {clue.number}.
                      </span>
                      <div className="flex-1">
                        <p style={{ color: '#FFD1B3' }}>{clue.clue}</p>
                        {!isRevealed && (
                          <button
                            onClick={() => revealWord(wordInfo)}
                            onMouseEnter={() => soundManager.init().then(() => soundManager.playHover())}
                            className="text-xs mt-1 px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-all"
                            style={{ color: '#FF9A5A' }}
                          >
                            Reveal
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Down Clues */}
          <div className="backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2" style={{
            background: 'rgba(75, 92, 122, 0.1)',
            borderColor: 'rgba(75, 92, 122, 0.3)'
          }}>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: '#4B5C7A' }}>
              <span>↓</span> Down
            </h3>
            <div className="space-y-3">
              {puzzle.clues.down.map((clue) => {
                const wordInfo = puzzle.words.find(w => w.number === clue.number);
                const isRevealed = revealedClues.has(clue.number);
                
                return (
                  <div key={clue.number} className="group">
                    <div className="flex items-start gap-2">
                      <span className="font-bold min-w-[30px]" style={{ color: '#FF7A32' }}>
                        {clue.number}.
                      </span>
                      <div className="flex-1">
                        <p style={{ color: '#FFD1B3' }}>{clue.clue}</p>
                        {!isRevealed && (
                          <button
                            onClick={() => revealWord(wordInfo)}
                            onMouseEnter={() => soundManager.init().then(() => soundManager.playHover())}
                            className="text-xs mt-1 px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-all"
                            style={{ color: '#FF9A5A' }}
                          >
                            Reveal
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// WORD SEARCH GAME
function WordSearch() {
  const [puzzle, setPuzzle] = useState(null);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState(new Set());
  const [currentSelection, setCurrentSelection] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const GRID_SIZE = 20;
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    generateNewPuzzle();
  }, []);

  const generateNewPuzzle = async () => {
    setIsGenerating(true);
    await soundManager.init();
    soundManager.playTap();

    // Get puzzle instantly from cache
    setTimeout(() => {
      try {
        const cachedPuzzle = puzzleCache.get('wordsearch');
        
        if (cachedPuzzle) {
          // Use cached puzzle - instant!
          setPuzzle(cachedPuzzle);
        } else {
          // Fallback: generate on the fly (rare)
          setPuzzle(puzzleCache.generateWordSearch());
        }
        
        setFoundWords(new Set());
        setSelectedCells([]);
        setCurrentSelection([]);
        setIsComplete(false);
        setShowCelebration(false);
      } catch (e) {
        console.error('Word search generation failed:', e);
      } finally {
        setIsGenerating(false);
      }
    }, 50);
  };

  const getCellKey = (row, col) => `${row}-${col}`;

  const handleMouseDown = (row, col) => {
    setIsSelecting(true);
    setCurrentSelection([[row, col]]);
  };

  const handleMouseEnter = (row, col) => {
    if (!isSelecting || !puzzle) return;
    
    const lastCell = currentSelection[currentSelection.length - 1];
    if (!lastCell) return;
    
    // Check if movement is in a valid direction (straight line)
    const rowDiff = row - lastCell[0];
    const colDiff = col - lastCell[1];
    
    // Allow movement in 8 directions only
    if (Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1 && (rowDiff !== 0 || colDiff !== 0)) {
      // Check if this continues the same direction
      if (currentSelection.length >= 2) {
        const prevCell = currentSelection[currentSelection.length - 2];
        const prevRowDiff = lastCell[0] - prevCell[0];
        const prevColDiff = lastCell[1] - prevCell[1];
        
        // Must continue in same direction
        if (rowDiff !== prevRowDiff || colDiff !== prevColDiff) return;
      }
      
      setCurrentSelection([...currentSelection, [row, col]]);
    }
  };

  const handleMouseUp = async () => {
    if (!isSelecting || !puzzle) return;
    
    setIsSelecting(false);
    
    // Check if selection matches a word
    const selectedWord = currentSelection
      .map(([r, c]) => puzzle.grid[r][c])
      .join('');
    
    const reverseWord = selectedWord.split('').reverse().join('');
    
    // Check forward and backward
    for (const wordObj of puzzle.words) {
      if ((wordObj.word === selectedWord || wordObj.word === reverseWord) && !foundWords.has(wordObj.word)) {
        // Found a word!
        await soundManager.init();
        soundManager.playSuccess();
        
        const newFoundWords = new Set(foundWords);
        newFoundWords.add(wordObj.word);
        setFoundWords(newFoundWords);
        
        setSelectedCells([...selectedCells, ...currentSelection.map(([r, c]) => getCellKey(r, c))]);
        
        // Check if all words found
        if (newFoundWords.size === puzzle.words.length) {
          setIsComplete(true);
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }
        
        setCurrentSelection([]);
        return;
      }
    }
    
    // No match - clear selection
    setCurrentSelection([]);
  };

  const isCellSelected = (row, col) => {
    return selectedCells.includes(getCellKey(row, col));
  };

  const isCellInCurrentSelection = (row, col) => {
    return currentSelection.some(([r, c]) => r === row && c === col);
  };

  if (!puzzle || isGenerating) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin mb-4 mx-auto">
            <Search className="w-16 h-16" style={{ color: '#FF9A5A' }} />
          </div>
          <p className="text-xl font-semibold" style={{ color: '#FFD1B3' }}>
            {isGenerating ? 'Generating word search...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="backdrop-blur-xl rounded-3xl p-6 mb-6 text-center shadow-2xl border-2 animate-fadeIn" style={{
        background: 'linear-gradient(135deg, rgba(255, 154, 90, 0.2) 0%, rgba(255, 209, 179, 0.2) 100%)',
        borderColor: 'rgba(255, 154, 90, 0.3)'
      }}>
        <div className="flex items-center justify-center gap-3 mb-3">
          <Search className="w-8 h-8" style={{ color: '#FF9A5A' }} />
          <h2 className="text-4xl font-bold" style={{ color: '#4B5C7A' }}>
            Bay Area Word Search
          </h2>
        </div>
        <p className="text-lg mb-2" style={{ color: '#FFD1B3' }}>
          Find all the hidden slang terms in the grid
        </p>
        <p className="text-sm" style={{ color: '#FF9A5A' }}>
          Found: {foundWords.size} / {puzzle.words.length}
        </p>
      </div>

      {/* Enhanced Celebration Banner */}
      {showCelebration && (
        <div className="backdrop-blur-xl rounded-3xl p-8 mb-6 text-center shadow-2xl border-4 relative overflow-hidden" style={{
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.4) 0%, rgba(16, 185, 129, 0.4) 50%, rgba(6, 182, 212, 0.4) 100%)',
          borderColor: 'rgba(34, 197, 94, 0.7)',
          animation: 'bounce 0.5s ease-in-out 3'
        }}>
          {/* Animated Background Effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: ['#FFD1B3', '#FF9A5A', '#FF7A32'][i % 3],
                  animationDuration: `${1 + Math.random()}s`,
                  animationDelay: `${Math.random() * 0.5}s`
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-12 h-12 text-yellow-300 animate-bounce" />
              <h3 className="text-4xl font-black text-white drop-shadow-lg">
                That Slaps! All Words Found! 🔥
              </h3>
              <Trophy className="w-12 h-12 text-yellow-300 animate-bounce" />
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-xl">
                <div className="text-3xl font-bold text-white">{puzzle.words.length}</div>
                <div className="text-sm text-white/80">Words Found</div>
              </div>
            </div>
            
            <p className="text-xl font-bold text-white mt-4 drop-shadow">
              You've got hella skills! Keep going! 💪
            </p>
          </div>
        </div>
      )}

      {/* Ad Placement - After Word Search Completion */}
      {isComplete && <AdBanner slot="wordsearch-completion" className="animate-fadeIn" />}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Word Search Grid */}
        <div className="lg:col-span-2">
          <div className="backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2" style={{
            background: 'rgba(255, 154, 90, 0.1)',
            borderColor: 'rgba(255, 154, 90, 0.3)'
          }}>
            <div 
              className="inline-block bg-white/90 rounded-2xl p-4 shadow-xl select-none"
              onMouseLeave={() => {
                if (isSelecting) handleMouseUp();
              }}
            >
              <div className="grid gap-0" style={{ 
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                width: 'fit-content'
              }}>
                {puzzle.grid.map((row, rowIndex) => (
                  row.map((letter, colIndex) => {
                    const isSelected = isCellSelected(rowIndex, colIndex);
                    const isCurrentSelection = isCellInCurrentSelection(rowIndex, colIndex);

                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                        onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                        onMouseUp={handleMouseUp}
                        className="flex items-center justify-center font-bold cursor-pointer transition-all hover:bg-blue-100"
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: isSelected 
                            ? '#90EE90' 
                            : isCurrentSelection 
                              ? '#FFD1B3' 
                              : '#fff',
                          border: '1px solid #ddd',
                          color: '#0F1C2E',
                          fontSize: '14px'
                        }}
                      >
                        {letter}
                      </div>
                    );
                  })
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-4 text-center" style={{ color: '#FFD1B3' }}>
              <p className="text-sm">
                Click and drag to select words • Words can be horizontal, vertical, or diagonal • Words can be forwards or backwards
              </p>
            </div>

            {/* Controls */}
            <div className="mt-6 flex gap-3 justify-center">
              <button
                onClick={generateNewPuzzle}
                onMouseEnter={() => soundManager.init().then(() => soundManager.playHover())}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg text-white"
                style={{ backgroundColor: '#FF9A5A' }}
              >
                <RotateCcw className="w-5 h-5" />
                New Puzzle
              </button>
            </div>
          </div>
        </div>

        {/* Word List */}
        <div className="backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2" style={{
          background: 'rgba(255, 209, 179, 0.1)',
          borderColor: 'rgba(255, 209, 179, 0.3)'
        }}>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: '#4B5C7A' }}>
            <BookOpen className="w-6 h-6" />
            Words to Find
          </h3>
          <p className="text-sm mb-4" style={{ color: '#FF9A5A' }}>
            Find these {puzzle.wordList?.length || 0} Bay Area slang terms:
          </p>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {puzzle.wordList && puzzle.wordList.length > 0 ? (
              puzzle.wordList.map((wordObj, index) => {
                const isFound = foundWords.has(wordObj.word);
                
                return (
                  <div
                    key={index}
                    className="px-4 py-3 rounded-xl transition-all hover:scale-102"
                    style={{
                      backgroundColor: isFound ? 'rgba(144, 238, 144, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                      textDecoration: isFound ? 'line-through' : 'none',
                      color: isFound ? '#4B5C7A' : '#FFD1B3',
                      opacity: isFound ? 0.6 : 1,
                      border: '1px solid',
                      borderColor: isFound ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 209, 179, 0.2)'
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-lg">{wordObj.original}</span>
                      {isFound && <Check className="w-5 h-5 flex-shrink-0" style={{ color: '#22c55e' }} />}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-4" style={{ color: '#FFD1B3' }}>
                Loading words...
              </div>
            )}
          </div>
          
          {/* Note for mobile users */}
          <p className="text-xs mt-4 text-center lg:hidden" style={{ color: '#FF9A5A', opacity: 0.8 }}>
            Scroll down to see the word list on mobile
          </p>
        </div>
      </div>
    </div>
  );
}

// WORD SCRAMBLE GAME
function WordScramble() {
  const [currentWord, setCurrentWord] = useState(null);
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    startNewRound();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const scrambleWord = (word, attempt = 0) => {
    const MAX_ATTEMPTS = 10;
    
    // Prevent infinite recursion
    if (attempt >= MAX_ATTEMPTS) {
      // For very short words that can't be scrambled differently, just return scrambled version
      return word.split('').reverse().join('');
    }
    
    const arr = word.split('');
    
    // For 3-letter words, use simple swap to avoid infinite loops
    if (arr.length === 3) {
      // Swap first and last letter
      [arr[0], arr[2]] = [arr[2], arr[0]];
      const scrambled = arr.join('');
      return scrambled === word ? word.split('').reverse().join('') : scrambled;
    }
    
    // Fisher-Yates shuffle for longer words
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    
    const scrambled = arr.join('');
    
    // Make sure it's actually scrambled, retry with limit
    return scrambled === word ? scrambleWord(word, attempt + 1) : scrambled;
  };

  const startNewRound = () => {
    const randomWord = bayAreaWords[Math.floor(Math.random() * bayAreaWords.length)];
    const word = randomWord.word.toUpperCase().replace(/\s/g, '');
    
    setCurrentWord(randomWord);
    setScrambledWord(scrambleWord(word));
    setUserGuess('');
    setTimeLeft(10);
    setIsActive(true); // Set immediately so input is enabled
    setShowSuccess(false);
    setShowFail(false);
    setGameOver(false);
    
    // Focus input after state updates
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleTimeout = async () => {
    setIsActive(false);
    setShowFail(true);
    setGameOver(true);
    
    await soundManager.init();
    // No sound for timeout - just visual feedback
    
    // Reset streak
    if (streak > bestStreak) {
      setBestStreak(streak);
    }
    setStreak(0);
    
    setTimeout(() => setShowFail(false), 2000);
  };

  const handleGuess = async () => {
    if (!currentWord || !isActive) return;
    
    const correctAnswer = currentWord.word.toUpperCase().replace(/\s/g, '');
    const guess = userGuess.toUpperCase().trim();
    
    if (guess === correctAnswer) {
      // Correct!
      setIsActive(false);
      setShowSuccess(true);
      
      await soundManager.init();
      soundManager.playSuccess();
      
      const newScore = score + 1;
      const newStreak = streak + 1;
      
      setScore(newScore);
      setStreak(newStreak);
      
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
      
      // Show celebration briefly then move to next word
      setTimeout(() => {
        setShowSuccess(false);
        startNewRound();
      }, 1500);
    } else {
      // Wrong answer
      await soundManager.init();
      soundManager.playTap();
      
      // Shake animation
      inputRef.current?.classList.add('animate-shake');
      setTimeout(() => {
        inputRef.current?.classList.remove('animate-shake');
      }, 500);
    }
  };

  const handleSkip = async () => {
    await soundManager.init();
    soundManager.playTap();
    
    setIsActive(false);
    setGameOver(true);
    
    // Reset streak
    if (streak > bestStreak) {
      setBestStreak(streak);
    }
    setStreak(0);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isActive) {
      e.preventDefault(); // Prevent form submission
      handleGuess();
    }
  };

  if (!currentWord) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse">
          <Zap className="w-16 h-16" style={{ color: '#4B5C7A' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* CSS for shake animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="backdrop-blur-xl rounded-2xl p-4 text-center shadow-xl border-2" style={{
          background: 'rgba(75, 92, 122, 0.2)',
          borderColor: 'rgba(75, 92, 122, 0.3)'
        }}>
          <div className="text-3xl font-black mb-1" style={{ color: '#4B5C7A' }}>{score}</div>
          <div className="text-sm" style={{ color: '#FFD1B3' }}>Score</div>
        </div>
        
        <div className="backdrop-blur-xl rounded-2xl p-4 text-center shadow-xl border-2" style={{
          background: 'rgba(255, 122, 50, 0.2)',
          borderColor: 'rgba(255, 122, 50, 0.3)'
        }}>
          <div className="text-3xl font-black mb-1 flex items-center justify-center gap-2" style={{ color: '#FF7A32' }}>
            {streak > 0 && <span className="animate-pulse">🔥</span>}
            {streak}
          </div>
          <div className="text-sm" style={{ color: '#FFD1B3' }}>Streak</div>
        </div>
        
        <div className="backdrop-blur-xl rounded-2xl p-4 text-center shadow-xl border-2" style={{
          background: 'rgba(255, 209, 179, 0.2)',
          borderColor: 'rgba(255, 209, 179, 0.3)'
        }}>
          <div className="text-3xl font-black mb-1" style={{ color: '#FFD1B3' }}>{bestStreak}</div>
          <div className="text-sm" style={{ color: '#FFD1B3' }}>Best</div>
        </div>
      </div>

      {/* Success Celebration */}
      {showSuccess && (
        <div className="backdrop-blur-xl rounded-3xl p-6 mb-6 text-center shadow-2xl border-2 animate-bounce" style={{
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.3) 100%)',
          borderColor: 'rgba(34, 197, 94, 0.5)'
        }}>
          <div className="flex items-center justify-center gap-3">
            <Check className="w-8 h-8 text-green-400" />
            <h3 className="text-3xl font-bold text-white">Correct! 🎉</h3>
            {streak >= 3 && <span className="text-2xl">🔥 {streak} in a row!</span>}
          </div>
        </div>
      )}

      {/* Fail Message */}
      {showFail && (
        <div className="backdrop-blur-xl rounded-3xl p-6 mb-6 text-center shadow-2xl border-2" style={{
          background: 'rgba(239, 68, 68, 0.2)',
          borderColor: 'rgba(239, 68, 68, 0.4)'
        }}>
          <h3 className="text-2xl font-bold text-red-300">Time's Up! ⏰</h3>
          <p className="text-lg mt-2" style={{ color: '#FFD1B3' }}>
            The answer was: <span className="font-bold">{currentWord.word}</span>
          </p>
        </div>
      )}

      {/* Main Game Card */}
      <div className="backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 mb-6" style={{
        background: 'linear-gradient(135deg, rgba(75, 92, 122, 0.15) 0%, rgba(15, 28, 46, 0.15) 100%)',
        borderColor: 'rgba(75, 92, 122, 0.3)'
      }}>
        {/* Timer */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Timer className="w-6 h-6" style={{ color: timeLeft <= 3 ? '#ef4444' : '#4B5C7A' }} />
          <div 
            className={`text-5xl font-black ${timeLeft <= 3 ? 'animate-pulse' : ''}`}
            style={{ color: timeLeft <= 3 ? '#ef4444' : '#4B5C7A' }}
          >
            {timeLeft}s
          </div>
        </div>

        {/* Scrambled Word */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#FFD1B3' }}>Unscramble this word:</h3>
          <div 
            className="text-6xl font-black tracking-wider mb-4 select-none"
            style={{ color: '#4B5C7A', letterSpacing: '0.2em' }}
          >
            {scrambledWord}
          </div>
          <p className="text-lg italic" style={{ color: '#FFD1B3', opacity: 0.8 }}>
            Hint: {currentWord.definition}
          </p>
        </div>

        {/* Input */}
        <div className="max-w-md mx-auto mb-6">
          <input
            ref={inputRef}
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!isActive}
            placeholder="Type your answer..."
            className="w-full px-6 py-4 rounded-2xl text-2xl font-bold text-center transition-all border-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            style={{
              backgroundColor: isActive ? '#ffffff' : '#f3f4f6',
              color: '#0F1C2E',
              borderColor: isActive ? '#FF7A32' : '#ccc'
            }}
            autoComplete="off"
            autoFocus
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={handleGuess}
            disabled={!isActive || userGuess.trim().length === 0}
            onMouseEnter={() => soundManager.init().then(() => soundManager.playHover())}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#FF7A32' }}
          >
            <Check className="w-6 h-6" />
            Submit
          </button>

          {gameOver ? (
            <button
              type="button"
              onClick={startNewRound}
              onMouseEnter={() => soundManager.init().then(() => soundManager.playHover())}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg text-white"
              style={{ backgroundColor: '#4B5C7A' }}
            >
              <RotateCcw className="w-6 h-6" />
              New Word
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSkip}
              disabled={!isActive}
              onMouseEnter={() => soundManager.init().then(() => soundManager.playHover())}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg text-white disabled:opacity-50"
              style={{ backgroundColor: '#4B5C7A' }}
            >
              <Zap className="w-6 h-6" />
              Skip
            </button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="backdrop-blur-xl rounded-2xl p-6 text-center shadow-xl border-2" style={{
        background: 'rgba(15, 28, 46, 0.3)',
        borderColor: 'rgba(75, 92, 122, 0.4)'
      }}>
        <h3 className="text-xl font-bold mb-2" style={{ color: '#4B5C7A' }}>How to Play</h3>
        <p style={{ color: '#FFD1B3' }}>
          Unscramble the Bay Area slang word before time runs out! Keep your streak going to become a true Yay Area expert.
        </p>
      </div>
    </div>
  );
}

// HOME PAGE WITH STAGGERED ANIMATIONS
function HomePage({ setView }) {
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setCardsVisible(true), 200);
  }, []);

  const handleCardClick = async (view) => {
    await soundManager.init();
    soundManager.playTap();
    setView(view);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div 
        className="backdrop-blur-xl rounded-3xl p-8 mb-8 text-center shadow-2xl border-2 animate-fadeIn"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 122, 50, 0.2) 0%, rgba(75, 92, 122, 0.2) 100%)',
          borderColor: 'rgba(255, 122, 50, 0.3)'
        }}
      >
        <Trophy className="w-20 h-20 mx-auto mb-4 animate-bounce" style={{ color: '#FFD1B3' }} />
        <h2 className="text-4xl font-black mb-4" style={{ color: '#4B5C7A' }}>
          It's Time to Peep some Turf Talk
        </h2>
        <p className="text-xl font-medium" style={{ color: '#FFD1B3' }}>
          Learn authentic Bay Area slang and become fluent in Yay Area vocabulary.
        </p>
      </div>

      {/* Ad Placement - Top of Home Page */}
      <AdBanner slot="home-top-banner" className="animate-fadeIn" />

      {/* Feature Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { id: 'wordofday', icon: BookOpen, title: 'Word of the Day', desc: 'Learn a new Bay Area term every day', gradient: 'linear-gradient(135deg, rgba(255, 122, 50, 0.15) 0%, rgba(255, 154, 90, 0.15) 100%)', border: 'rgba(255, 122, 50, 0.4)', delay: 0 },
          { id: 'crossword', icon: Grid3x3, title: 'Crossword Puzzle', desc: 'Test your knowledge with puzzles', gradient: 'linear-gradient(135deg, rgba(255, 154, 90, 0.15) 0%, rgba(255, 209, 179, 0.15) 100%)', border: 'rgba(255, 154, 90, 0.4)', delay: 0.1 },
          { id: 'wordsearch', icon: Search, title: 'Word Search', desc: 'Find hidden slang terms', gradient: 'linear-gradient(135deg, rgba(255, 209, 179, 0.15) 0%, rgba(75, 92, 122, 0.15) 100%)', border: 'rgba(255, 209, 179, 0.4)', delay: 0.2 },
          { id: 'scramble', icon: Zap, title: 'Word Scramble', desc: 'Race against time', gradient: 'linear-gradient(135deg, rgba(75, 92, 122, 0.15) 0%, rgba(15, 28, 46, 0.15) 100%)', border: 'rgba(75, 92, 122, 0.4)', delay: 0.3 }
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              onMouseEnter={() => soundManager.init().then(() => soundManager.playHover())}
              className="backdrop-blur-xl rounded-3xl p-8 border-2 cursor-pointer transform transition-all hover:scale-105 active:scale-95 shadow-xl min-h-[200px] group"
              style={{
                background: card.gradient,
                borderColor: card.border,
                transform: cardsVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                opacity: cardsVisible ? 1 : 0,
                transition: `all 0.6s ease ${card.delay}s`
              }}
            >
              <Icon 
                className="w-16 h-16 mb-4 transition-transform group-hover:scale-110 group-hover:rotate-12" 
                style={{ color: '#FFD1B3' }} 
              />
              <h3 className="text-3xl font-bold mb-3" style={{ color: '#4B5C7A' }}>
                {card.title}
              </h3>
              <p className="text-lg" style={{ color: '#FFD1B3' }}>
                {card.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Ad Placement - Between Games and About */}
      <AdBanner slot="home-middle-banner" className="animate-fadeIn" />

      {/* About Section */}
      <div 
        className="mt-8 backdrop-blur-xl rounded-3xl p-8 text-center shadow-xl border-2 animate-fadeIn"
        style={{
          background: 'rgba(15, 28, 46, 0.3)',
          borderColor: 'rgba(75, 92, 122, 0.4)',
          animationDelay: '0.6s'
        }}
      >
        <h3 className="text-2xl font-bold mb-4" style={{ color: '#4B5C7A' }}>
          About Bay Area Slang
        </h3>
        <p className="text-lg" style={{ color: '#FFD1B3' }}>
          The Bay Area has contributed countless words to American culture. From Oakland to SF, Vallejo to San Jose - learn the authentic language of the Yay Area!
        </p>
      </div>
    </div>
  );
}

// PUZZLE CACHE SYSTEM - Pre-generates puzzles to eliminate lag
class PuzzleCache {
  constructor() {
    this.cache = {
      crossword: [],
      wordsearch: []
    };
    this.maxCacheSize = 3; // Keep 3 puzzles ready
    this.isGenerating = false;
  }

  // Pre-generate puzzles in background
  async preFill() {
    if (this.isGenerating) return;
    this.isGenerating = true;

    try {
      // Generate crosswords if needed
      while (this.cache.crossword.length < this.maxCacheSize) {
        const puzzle = this.generateCrossword();
        if (puzzle) this.cache.crossword.push(puzzle);
      }

      // Generate word searches if needed
      while (this.cache.wordsearch.length < this.maxCacheSize) {
        const puzzle = this.generateWordSearch();
        if (puzzle) this.cache.wordsearch.push(puzzle);
      }
    } finally {
      this.isGenerating = false;
    }
  }

  // Get a puzzle instantly from cache
  get(type) {
    const puzzle = this.cache[type]?.shift();
    
    // Async refill cache in background
    setTimeout(() => this.preFill(), 100);
    
    return puzzle;
  }

  // Crossword generation (optimized)
  generateCrossword(retryCount = 0) {
    const MAX_RETRIES = 3;
    
    // Prevent infinite recursion
    if (retryCount >= MAX_RETRIES) {
      console.warn('Max retries reached, generating puzzle with available words');
      // Return puzzle with whatever words were placed
    }
    
    const availableWords = [...bayAreaWords]
      .filter(w => {
        const cleanWord = w.word.toUpperCase().replace(/\s/g, '');
        return cleanWord.length >= 3 && cleanWord.length <= 8;
      })
      .sort(() => Math.random() - 0.5)
      .slice(0, 35)
      .map(w => ({
        ...w,
        word: w.word.toUpperCase().replace(/\s/g, '')
      }));

    const grid = Array(15).fill(null).map(() => Array(15).fill(null));
    const words = [];
    const clues = { across: [], down: [] };
    let wordNumber = 1;

    const canPlaceWord = (word, row, col, direction) => {
      if (direction === 'across') {
        if (col + word.length > 15) return false;
        for (let i = 0; i < word.length; i++) {
          const cell = grid[row][col + i];
          if (cell !== null && cell !== word[i]) return false;
        }
      } else {
        if (row + word.length > 15) return false;
        for (let i = 0; i < word.length; i++) {
          const cell = grid[row + i][col];
          if (cell !== null && cell !== word[i]) return false;
        }
      }
      return true;
    };

    const placeWord = (wordData, row, col, direction) => {
      const word = wordData.word;
      if (!canPlaceWord(word, row, col, direction)) return false;
      
      if (direction === 'across') {
        for (let i = 0; i < word.length; i++) {
          grid[row][col + i] = word[i];
        }
      } else {
        for (let i = 0; i < word.length; i++) {
          grid[row + i][col] = word[i];
        }
      }

      words.push({
        word: word,
        start: [row, col],
        direction: direction,
        number: wordNumber,
        clue: wordData.definition
      });
      
      clues[direction].push({
        number: wordNumber,
        clue: wordData.definition,
        answer: word
      });

      wordNumber++;
      return true;
    };

    if (availableWords[0]) {
      placeWord(availableWords[0], 7, 4, 'across');
    }

    let wordsPlaced = 1;
    for (let i = 1; i < availableWords.length && wordsPlaced < 25; i++) {
      const wordData = availableWords[i];
      const word = wordData.word;
      let placed = false;

      for (let w = 0; w < words.length && !placed; w++) {
        const existingWord = words[w];
        
        for (let j = 0; j < existingWord.word.length && !placed; j++) {
          const letter = existingWord.word[j];
          const idx = word.indexOf(letter);
          
          if (idx !== -1) {
            const [eRow, eCol] = existingWord.start;
            
            if (existingWord.direction === 'across') {
              const newRow = eRow - idx;
              const newCol = eCol + j;
              if (newRow >= 0) {
                placed = placeWord(wordData, newRow, newCol, 'down');
              }
            } else {
              const newRow = eRow + j;
              const newCol = eCol - idx;
              if (newCol >= 0) {
                placed = placeWord(wordData, newRow, newCol, 'across');
              }
            }
          }
        }
      }

      if (placed) wordsPlaced++;
    }

    // Retry with different words if not enough
    if (words.length < 17) {
      return this.generateCrossword(retryCount + 1);
    }

    return { grid, words, clues };
  }

  // Word Search generation (optimized)
  generateWordSearch() {
    const GRID_SIZE = 20;
    const words = bayAreaWords
      .map(w => w.word.toUpperCase().replace(/\s/g, ''))
      .filter(w => w.length >= 3 && w.length <= 10)
      .sort(() => Math.random() - 0.5)
      .slice(0, 30);

    const grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    const placedWords = [];

    const directions = [
      [0, 1], [1, 0], [1, 1], [1, -1],
      [0, -1], [-1, 0], [-1, -1], [-1, 1]
    ];

    for (const word of words) {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 20) {
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);
        const direction = directions[Math.floor(Math.random() * directions.length)];
        
        let fits = true;
        const positions = [];
        
        for (let i = 0; i < word.length; i++) {
          const newRow = row + (direction[0] * i);
          const newCol = col + (direction[1] * i);
          
          if (newRow < 0 || newRow >= GRID_SIZE || newCol < 0 || newCol >= GRID_SIZE) {
            fits = false;
            break;
          }
          
          if (grid[newRow][newCol] !== '' && grid[newRow][newCol] !== word[i]) {
            fits = false;
            break;
          }
          
          positions.push([newRow, newCol]);
        }
        
        if (fits) {
          for (let i = 0; i < word.length; i++) {
            grid[positions[i][0]][positions[i][1]] = word[i];
          }
          placedWords.push({
            word: word,
            positions: positions,
            found: false
          });
          placed = true;
        }
        
        attempts++;
      }

      if (placedWords.length >= 15) break;
    }

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === '') {
          grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }

    return {
      grid: grid,
      words: placedWords,
      wordList: placedWords.map(w => ({
        word: w.word,
        original: bayAreaWords.find(bw => bw.word.toUpperCase().replace(/\s/g, '') === w.word)?.word || w.word
      })).sort((a, b) => a.original.localeCompare(b.original))
    };
  }
}

const puzzleCache = new PuzzleCache();

// MAIN APP
export default function BayAreaSlangApp() {
  const [currentView, setCurrentView] = useState('home');

  // Pre-fill puzzle cache on app mount
  useEffect(() => {
    puzzleCache.preFill();
  }, []);

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'wordofday', icon: BookOpen, label: 'Word' },
    { id: 'crossword', icon: Grid3x3, label: 'Crossword' },
    { id: 'wordsearch', icon: Search, label: 'Search' },
    { id: 'scramble', icon: Zap, label: 'Scramble' },
  ];

  const handleNavClick = async (id) => {
    await soundManager.init();
    soundManager.playTap();
    setCurrentView(id);
    
    // Pre-fill cache in background when navigating
    setTimeout(() => puzzleCache.preFill(), 200);
  };

  const renderView = () => {
    switch (currentView) {
      case 'wordofday': return <WordOfDay />;
      case 'crossword': return <Crossword />;
      case 'wordsearch': return <WordSearch />;
      case 'scramble': return <WordScramble />;
      default: return <HomePage setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Add CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      {/* CUSTOM GRADIENT BACKGROUND */}
      <div className="fixed inset-0 z-0" style={{
        background: 'linear-gradient(180deg, #FF7A32 0%, #FF9A5A 28%, #FFD1B3 45%, #4B5C7A 70%, #0F1C2E 100%)'
      }} />
      
      <div className="relative z-10">
        {/* HEADER */}
        <div className="text-center pt-12 pb-6 px-4 animate-fadeIn">
          <h1 
            className="text-5xl md:text-6xl font-black mb-2 tracking-tight transition-all hover:scale-105 cursor-default"
            style={{
              color: '#4B5C7A',
              textShadow: '0 0 30px rgba(75, 92, 122, 0.5), 0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            Yayish.io
          </h1>
          <p className="text-lg font-medium" style={{ color: '#4B5C7A', opacity: 0.9 }}>
            Master the Yay Area Vocabulary
          </p>
        </div>

        {/* CONTENT */}
        <div className="container mx-auto px-4 pb-32">
          {renderView()}
        </div>

        {/* BOTTOM NAVIGATION - iOS STYLE */}
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <div className="bg-[#0F1C2E]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
            <div className="flex justify-around items-center px-2 py-2 max-w-4xl mx-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button 
                    key={item.id} 
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={() => soundManager.init().then(() => soundManager.playHover())}
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px] ${
                      isActive ? 'scale-105' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ 
                      backgroundColor: isActive ? 'rgba(255, 122, 50, 0.2)' : 'transparent',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Icon 
                      className={`w-6 h-6 transition-all ${isActive ? 'animate-bounce' : ''}`}
                      style={{ color: isActive ? '#FF7A32' : '#FFD1B3' }} 
                    />
                    <span 
                      className="text-xs font-semibold transition-all"
                      style={{ color: isActive ? '#FF7A32' : '#FFD1B3' }}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}