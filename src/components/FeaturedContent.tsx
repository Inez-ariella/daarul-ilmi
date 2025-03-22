
import { ContentCard, ContentCardProps } from "./ContentCard";

interface FeaturedContentProps {
  title: string;
  subtitle?: string;
  contentType: "video" | "audio" | "hadith";
}

// Mock data for our content
const mockContent: Record<string, ContentCardProps[]> = {
  video: [
    {
      id: "1",
      title: "Pengantar Ilmu Tauhid",
      description: "Mengenal dasar-dasar Tauhid dalam Islam dan pentingnya dalam kehidupan seorang Muslim.",
      image: "https://source.unsplash.com/random/800x600/?mosque",
      type: "video",
      rating: 4.8,
      date: "10 Juni 2023",
      duration: "45:20"
    },
    {
      id: "2",
      title: "Fiqih Shalat: Tuntunan Shalat Yang Benar",
      description: "Pembelajaran mendetail tentang tata cara shalat yang sesuai dengan sunnah Rasulullah SAW.",
      image: "https://source.unsplash.com/random/800x600/?prayer",
      type: "video",
      rating: 4.7,
      date: "25 Juli 2023",
      duration: "56:15"
    },
    {
      id: "3",
      title: "Adab Mencari Ilmu dalam Islam",
      description: "Membahas etika dan adab dalam mencari ilmu menurut perspektif Islam.",
      image: "https://source.unsplash.com/random/800x600/?study",
      type: "video",
      rating: 4.9,
      date: "3 Agustus 2023",
      duration: "38:45"
    },
    {
      id: "4",
      title: "Sirah Nabawiyah: Kehidupan Rasulullah SAW",
      description: "Seri pembelajaran tentang kehidupan dan perjalanan Nabi Muhammad SAW dari kelahiran hingga wafatnya.",
      image: "https://source.unsplash.com/random/800x600/?desert",
      type: "video",
      rating: 5.0,
      date: "17 September 2023",
      duration: "1:10:30"
    },
  ],
  audio: [
    {
      id: "1",
      title: "Tafsir Surah Al-Fatihah",
      description: "Penjelasan mendalam tentang makna dan tafsir surah Al-Fatihah yang merupakan pembuka Al-Qur'an.",
      image: "https://source.unsplash.com/random/800x600/?quran",
      type: "audio",
      rating: 4.9,
      date: "5 Mei 2023",
      duration: "32:10"
    },
    {
      id: "2",
      title: "Keutamaan Bulan Ramadhan",
      description: "Kajian tentang keutamaan dan amalan di bulan suci Ramadhan.",
      image: "https://source.unsplash.com/random/800x600/?ramadan",
      type: "audio",
      rating: 4.6,
      date: "12 April 2023",
      duration: "28:45"
    },
    {
      id: "3",
      title: "Akhlak dalam Bermuamalah",
      description: "Pentingnya akhlak dalam berinteraksi dan bertransaksi dengan sesama manusia.",
      image: "https://source.unsplash.com/random/800x600/?people",
      type: "audio",
      rating: 4.7,
      date: "20 Juni 2023",
      duration: "41:20"
    },
    {
      id: "4",
      title: "Menjaga Kebersihan sebagai Bagian dari Iman",
      description: "Kajian tentang pentingnya kebersihan dalam Islam dan hubungannya dengan keimanan.",
      image: "https://source.unsplash.com/random/800x600/?clean",
      type: "audio",
      rating: 4.5,
      date: "8 Juli 2023",
      duration: "25:30"
    },
  ],
  hadith: [
    {
      id: "1",
      title: "Hadits Arbain: 40 Hadits Pilihan",
      description: "Kumpulan 40 hadits pilihan yang mencakup berbagai aspek penting dalam ajaran Islam.",
      image: "https://source.unsplash.com/random/800x600/?book",
      type: "hadith",
      rating: 5.0,
      date: "15 Januari 2023",
    },
    {
      id: "2",
      title: "Hadits tentang Niat dalam Beramal",
      description: "Kumpulan hadits yang membahas pentingnya niat dalam melakukan setiap amalan.",
      image: "https://source.unsplash.com/random/800x600/?heart",
      type: "hadith",
      rating: 4.8,
      date: "3 Februari 2023",
    },
    {
      id: "3",
      title: "Hadits Qudsi: Firman Allah yang Diriwayatkan Rasulullah",
      description: "Penjelasan tentang hadits-hadits qudsi dan perbedaannya dengan hadits nabawi.",
      image: "https://source.unsplash.com/random/800x600/?sky",
      type: "hadith",
      rating: 4.9,
      date: "22 Maret 2023",
    },
    {
      id: "4",
      title: "Hadits tentang Berbakti kepada Orang Tua",
      description: "Kumpulan hadits yang membahas keutamaan dan cara berbakti kepada kedua orang tua.",
      image: "https://source.unsplash.com/random/800x600/?family",
      type: "hadith",
      rating: 4.7,
      date: "10 April 2023",
    },
  ],
};

export function FeaturedContent({ title, subtitle, contentType }: FeaturedContentProps) {
  const contentItems = mockContent[contentType] || [];

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl font-bold">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contentItems.map((item) => (
            <ContentCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
