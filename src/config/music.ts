import { getAssetUrl } from '@/data/images';

/**
 * Songs used by the drop-down hero player.
 *
 * Files live in `public/tracks/`. The helper keeps the /Portfolio/ base path
 * and URL-encodes filenames with spaces, brackets, or non-Latin characters.
 * `cover` points to the embedded album art extracted into `public/tracks/covers/`.
 */
export type Track = {
  title: string;
  artist: string;
  url: string;
  cover?: string;
};

const trackUrl = (file: string): string =>
  getAssetUrl(`/tracks/${encodeURI(file)}`);

const trackCover = (number: string): string =>
  getAssetUrl(`/tracks/covers/${number}.jpg`);

export const tracks: Track[] = [
  { title: "I Feel It Coming ft. Daft Punk", artist: "TheWeeknd", url: trackUrl("@TheWeeknd - I Feel It Coming ft. Daft Punk (Lyrics).mp3"), cover: trackCover('01') },
  { title: "Aarzu", artist: "Local track", url: trackUrl("Aarzu.mp3"), cover: trackCover('02') },
  { title: "Akhiyaan Gulaab", artist: "Local track", url: trackUrl("Akhiyaan Gulaab.mp3"), cover: trackCover('03') },
  { title: "All The Stars", artist: "Kendrick Lamar & SZA", url: trackUrl("All The Stars - Music Video _ Black Panther _ Kendrick Lamar _ SZA _ Chadwick Boseman.mp3"), cover: trackCover('04') },
  { title: "AMBARSARIYA", artist: "Local track", url: trackUrl("AMBARSARIYA.mp3"), cover: trackCover('05') },
  { title: "ARZ KIYA HAI", artist: "Anuv Jain", url: trackUrl("ARZ KIYA HAI (Lyrics) - Anuv Jain _ With Translation _ Coke Studio.mp3"), cover: trackCover('06') },
  { title: "As It Was", artist: "Local track", url: trackUrl("As It Was (Official Video).mp3"), cover: trackCover('07') },
  { title: "BIRDS OF A FEATHER", artist: "Local track", url: trackUrl("BIRDS OF A FEATHER.mp3"), cover: trackCover('08') },
  { title: "Boyfriend", artist: "Local track", url: trackUrl("Boyfriend.mp3"), cover: trackCover('09') },
  { title: "Chicago", artist: "Local track", url: trackUrl("Chicago (Official Audio).mp3"), cover: trackCover('10') },
  { title: "CHIHIRO", artist: "Local track", url: trackUrl("CHIHIRO.mp3"), cover: trackCover('11') },
  { title: "Co2", artist: "Local track", url: trackUrl("Co2.mp3"), cover: trackCover('12') },
  { title: "Company", artist: "Local track", url: trackUrl("Company.mp3"), cover: trackCover('13') },
  { title: "Dilruba Dilnasheen", artist: "Rito Riba", url: trackUrl("Dilruba Dilnasheen - Rito Riba (Lyrics).mp3"), cover: trackCover('14') },
  { title: "Let Me Love You", artist: "DJ Snake ft. Justin Bieber", url: trackUrl("DJ Snake ft. Justin Bieber - Let Me Love You [Official Lyric Video].mp3"), cover: trackCover('15') },
  { title: "Do I Wanna Know", artist: "Local track", url: trackUrl("Do I Wanna Know_.mp3") },
  { title: "Shape of You", artist: "Ed Sheeran", url: trackUrl("Ed Sheeran - Shape of You 🔥 (slowed & reverb).mp3"), cover: trackCover('17') },
  { title: "End of Beginning", artist: "Local track", url: trackUrl("End of Beginning.mp3"), cover: trackCover('18') },
  { title: "good for you x one of the girls", artist: "Selena Gomez x The Weeknd", url: trackUrl("good for you x one of the girls (lyrics) (tiktok mashup) _ Selena Gomez x The Weeknd.mp3"), cover: trackCover('19') },
  { title: "Haareya", artist: "Arijit Singh", url: trackUrl("Haareya (Lyrics) - Arijit Singh _ Meri Pyaari Bindu _ VibeVault.mp3"), cover: trackCover('20') },
  { title: "I Think They Call This Love", artist: "Matthew Ifield", url: trackUrl("I Think They Call This Love - Matthew Ifield [Sub español + Eng] Official Video.mp3"), cover: trackCover('21') },
  { title: "Iktara", artist: "Kavita Seth", url: trackUrl("Iktara (Lyrics) _ Wake Up Sid _ Kavita Seth _ Amit Trivedi _ Lyrics For You.mp3"), cover: trackCover('22') },
  { title: "Jaana Samjho Na", artist: "Local track", url: trackUrl("Jaana Samjho Na.mp3"), cover: trackCover('23') },
  { title: "Janiye", artist: "Local track", url: trackUrl("Janiye.mp3"), cover: trackCover('24') },
  { title: "Maname", artist: "Local track", url: trackUrl("Maname.mp3"), cover: trackCover('25') },
  { title: "nadaaniyan", artist: "Jonita Gandhi", url: trackUrl("nadaaniyan (with Jonita Gandhi).mp3"), cover: trackCover('26') },
  { title: "NASTY BABE", artist: "ПАТРИКИ", url: trackUrl("NASTY BABE - ПАТРИКИ (Lyric video, 2025).mp3"), cover: trackCover('27') },
  { title: "Paaro", artist: "Local track", url: trackUrl("Paaro.mp3"), cover: trackCover('28') },
  { title: "Death Bed", artist: "Powfu", url: trackUrl("Powfu ~ Death Bed (slowed + reverb).mp3"), cover: trackCover('29') },
  { title: "Rakhlo Tum Chupaake", artist: "Local track", url: trackUrl("Rakhlo Tum Chupaake.mp3"), cover: trackCover('30') },
  { title: "Sahiba", artist: "Local track", url: trackUrl("Sahiba.mp3"), cover: trackCover('31') },
  { title: "São Paulo", artist: "Local track", url: trackUrl("São Paulo.mp3"), cover: trackCover('32') },
  { title: "Shape of You", artist: "Local track", url: trackUrl("Shape of You.mp3") },
  { title: "STAY", artist: "Local track", url: trackUrl("STAY (Official Video).mp3"), cover: trackCover('34') },
  { title: "Strangers", artist: "Local track", url: trackUrl("Strangers.mp3"), cover: trackCover('35') },
  { title: "Sunn Raha Hai", artist: "Local track", url: trackUrl("Sunn Raha Hai.mp3"), cover: trackCover('36') },
  { title: "Dracula In the end, I hope it's you and me Tiktok Song", artist: "Tame Impala, JENNIE", url: trackUrl("Tame Impala, JENNIE - Dracula (JENNIE Remix) (Lyrics) In the end, I hope it's you and me Tiktok Song.mp3"), cover: trackCover('37') },
  { title: "Starboy", artist: "The Weeknd", url: trackUrl("The Weeknd - Starboy (Extended).mp3"), cover: trackCover('38') },
  { title: "blue", artist: "yung kai", url: trackUrl("yung kai - blue (official music video).mp3"), cover: trackCover('39') },
];
