export interface Division {
  name: string;
  banglaName: string;
  districts: string[];
}

export const divisions: Division[] = [
  {
    name: "Dhaka",
    banglaName: "ঢাকা",
    districts: ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"]
  },
  {
    name: "Chittagong",
    banglaName: "চট্টগ্রাম",
    districts: ["Chittagong", "Cox's Bazar", "Rangamati", "Bandarban", "Khagrachhari", "Feni", "Lakshmipur", "Comilla", "Chandpur", "Brahmanbaria", "Noakhali"]
  },
  {
    name: "Rajshahi",
    banglaName: "রাজশাহী",
    districts: ["Rajshahi", "Joypurhat", "Naogaon", "Natore", "Nawabganj", "Pabna", "Bogra", "Sirajganj"]
  },
  {
    name: "Khulna",
    banglaName: "খুলনা",
    districts: ["Khulna", "Bagherhat", "Jessore", "Jhenaidah", "Kushtia", "Magura", "Meherpur", "Narail", "Shatkhira", "Chuadanga"]
  },
  {
    name: "Barisal",
    banglaName: "বরিশাল",
    districts: ["Barisal", "Barguna", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"]
  },
  {
    name: "Sylhet",
    banglaName: "সিলেট",
    districts: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"]
  },
  {
    name: "Rangpur",
    banglaName: "রংপুর",
    districts: ["Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"]
  },
  {
    name: "Mymensingh",
    banglaName: "ময়মনসিংহ",
    districts: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"]
  }
];

export const allDistricts: string[] = divisions.reduce<string[]>((acc, div) => {
  return [...acc, ...div.districts];
}, []).sort();

export const banglaDistrictsMap: { [key: string]: string } = {
  "Dhaka": "ঢাকা", "Faridpur": "ফরিদপুর", "Gazipur": "গাজীপুর", "Gopalganj": "গোপালগঞ্জ", "Kishoreganj": "কিশোরগঞ্জ",
  "Madaripur": "মাদারীপুর", "Manikganj": "মানিকগঞ্জ", "Munshiganj": "মুন্সীগঞ্জ", "Narayanganj": "নারায়ণগঞ্জ",
  "Narsingdi": "নরসিংদী", "Rajbari": "রাজবাড়ী", "Shariatpur": "শরীয়তপুর", "Tangail": "টাঙ্গাইল",
  "Chittagong": "চট্টগ্রাম", "Cox's Bazar": "কক্সবাজার", "Rangamati": "রাঙ্গামাটি", "Bandarban": "বান্দরবান",
  "Khagrachhari": "খাগড়াছড়ি", "Feni": "ফেনী", "Lakshmipur": "লক্ষ্মীপুর", "Comilla": "কুমিল্লা",
  "Chandpur": "চাঁদপুর", "Brahmanbaria": "ব্রাহ্মণবাড়িয়া", "Noakhali": "নোয়াখালী",
  "Rajshahi": "রাজশাহী", "Joypurhat": "জয়পুরহাট", "Naogaon": "নওগাঁ", "Natore": "নাটোর",
  "Nawabganj": "নবাবগঞ্জ", "Pabna": "পাবনা", "Bogra": "বগুড়া", "Sirajganj": "সিরাজগঞ্জ",
  "Khulna": "খুলনা", "Bagherhat": "বাগেরহাট", "Jessore": "যশোর", "Jhenaidah": "ঝিনাইদহ",
  "Kushtia": "কুষ্টিয়া", "Magura": "মাগুরা", "Meherpur": "মেহেরপুর", "Narail": "নড়াইল",
  "Shatkhira": "সাতক্ষীরা", "Chuadanga": "চুয়াডাঙ্গা",
  "Barisal": "বরিশাল", "Barguna": "বরগুনা", "Bhola": "ভোলা", "Jhalokati": "ঝালকাঠি",
  "Patuakhali": "পটুয়াখালী", "Pirojpur": "পিরোজপুর",
  "Sylhet": "সিলেট", "Moulvibazar": "মৌলভীবাজার", "Habiganj": "হবিগঞ্জ", "Sunamganj": "সুনামগঞ্জ",
  "Rangpur": "রংপুর", "Dinajpur": "দিনাজপুর", "Gaibandha": "গাইবান্ধা", "Kurigram": "কুড়িগ্রাম",
  "Lalmonirhat": "লালমনিরহাট", "Nilphamari": "নীলফামারী", "Panchagarh": "পঞ্চগড়", "Thakurgaon": "ঠাকুরগাঁও",
  "Mymensingh": "ময়মনসিংহ", "Jamalpur": "জামালপুর", "Netrokona": "নেত্রকোণা", "Sherpur": "শেরপুর"
};
