import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

// Simple interactive prototype (single-file) built with React + Tailwind.
// - Client-side mock data
// - Search with autosuggest
// - Filterable phone list
// - Phone detail page with specs
// - Comparison page (side-by-side) with highlighted best values
// Notes:
// - This is a prototype. Replace mockData with real data/API calls.
// - Tailwind classes are used for styling. Make sure Tailwind is configured in the project.

const mockPhones = [
  {
    id: "poco-f4",
    brand: "Poco",
    name: "Poco F4",
    price: 299,
    released: "2023-06-15",
    image: "/images/poco-f4.png",
    specs: {
      display: { size: 6.67, type: "AMOLED", resolution: "1220x2712", refresh: 120 },
      battery: { capacity: 4500, charging: 67 },
      camera: { main: 64, ultrawide: 8, tele: 2 },
      memory: { ram: 8, storage: 256 },
      os: "Android 13",
      chipset: "Snapdragon 8+ Gen 1",
      weight: 195,
    },
  },
  {
    id: "samsung-s23",
    brand: "Samsung",
    name: "Galaxy S23",
    price: 799,
    released: "2023-02-01",
    image: "/images/galaxy-s23.png",
    specs: {
      display: { size: 6.1, type: "Dynamic AMOLED", resolution: "1080x2340", refresh: 120 },
      battery: { capacity: 3900, charging: 45 },
      camera: { main: 50, ultrawide: 12, tele: 10 },
      memory: { ram: 8, storage: 128 },
      os: "Android 13",
      chipset: "Snapdragon 8 Gen 2",
      weight: 168,
    },
  },
  {
    id: "iphone-14",
    brand: "Apple",
    name: "iPhone 14",
    price: 799,
    released: "2022-09-16",
    image: "/images/iphone-14.png",
    specs: {
      display: { size: 6.1, type: "Super Retina XDR", resolution: "1170x2532", refresh: 60 },
      battery: { capacity: 3279, charging: 20 },
      camera: { main: 12, ultrawide: 12, tele: 0 },
      memory: { ram: 6, storage: 128 },
      os: "iOS 16",
      chipset: "A15 Bionic",
      weight: 172,
    },
  },
  {
    id: "oneplus-11",
    brand: "OnePlus",
    name: "OnePlus 11",
    price: 699,
    released: "2023-02-07",
    image: "/images/oneplus-11.png",
    specs: {
      display: { size: 6.7, type: "AMOLED", resolution: "1440x3216", refresh: 120 },
      battery: { capacity: 5000, charging: 80 },
      camera: { main: 50, ultrawide: 48, tele: 32 },
      memory: { ram: 12, storage: 256 },
      os: "Android 13",
      chipset: "Snapdragon 8 Gen 2",
      weight: 205,
    },
  },
  {
    id: "xiaomi-redmi-note-12",
    brand: "Xiaomi",
    name: "Redmi Note 12",
    price: 199,
    released: "2023-04-10",
    image: "/images/redmi-note-12.png",
    specs: {
      display: { size: 6.67, type: "IPS", resolution: "1080x2400", refresh: 90 },
      battery: { capacity: 5000, charging: 33 },
      camera: { main: 48, ultrawide: 8, tele: 2 },
      memory: { ram: 6, storage: 128 },
      os: "Android 13",
      chipset: "Snapdragon 4 Gen 1",
      weight: 187,
    },
  },
  {
    id: "google-pixel-8",
    brand: "Google",
    name: "Pixel 8",
    price: 699,
    released: "2023-10-04",
    image: "/images/pixel-8.png",
    specs: {
      display: { size: 6.2, type: "OLED", resolution: "1080x2400", refresh: 120 },
      battery: { capacity: 4355, charging: 30 },
      camera: { main: 50, ultrawide: 12, tele: 48 },
      memory: { ram: 8, storage: 128 },
      os: "Android 14",
      chipset: "Google Tensor G3",
      weight: 176,
    },
  },
];

function Header({ compareCount }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">MS</div>
          <div>
            <div className="font-semibold">MobileSpecs</div>
            <div className="text-xs text-gray-500">Quick phone specs & comparisons</div>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/phones" className="text-sm hover:underline">الهواتف</Link>
          <Link to="/compare" className="text-sm hover:underline flex items-center gap-2">
            المقارنة
            <span className="ml-1 bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded">{compareCount}</span>
          </Link>
          <Link to="/news" className="text-sm hover:underline">الأخبار</Link>
        </nav>
      </div>
    </header>
  );
}

function SearchBar({ onSelect, phones }) {
  const [q, setQ] = useState("");
  const suggestions = useMemo(() => {
    if (!q) return [];
    const low = q.toLowerCase();
    return phones
      .filter((p) => p.name.toLowerCase().includes(low) || p.brand.toLowerCase().includes(low))
      .slice(0, 6);
  }, [q, phones]);

  return (
    <div className="relative">
      <input
        type="search"
        className="border rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-indigo-200" 
        placeholder="ابحث عن هاتف أو شركة..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search phones"
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 mt-1 w-80 bg-white border rounded-md shadow z-40">
          {suggestions.map((s) => (
            <li
              key={s.id}
              className="px-3 py-2 hover:bg-indigo-50 cursor-pointer"
              onClick={() => { setQ(""); onSelect(s.id); }}
            >
              <div className="text-sm font-medium">{s.brand} — {s.name}</div>
              <div className="text-xs text-gray-500">{s.specs.chipset} • {s.specs.memory.ram}GB</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Home({ phones, onSelect }) {
  const popular = phones.slice(0, 4);
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-b from-white to-indigo-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">أحدث الهواتف</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popular.map((p) => (
              <article key={p.id} className="bg-white rounded-lg p-4 shadow-sm flex gap-4 items-center">
                <div className="w-20 h-28 bg-gray-100 rounded flex items-center justify-center">📱</div>
                <div>
                  <Link to={`/phones/${p.id}`} className="font-semibold">{p.brand} {p.name}</Link>
                  <div className="text-sm text-gray-500">{p.specs.chipset} • {p.specs.memory.ram}GB</div>
                  <div className="mt-2 text-indigo-600 font-semibold">${p.price}</div>
                </div>
                <div className="ml-auto">
                  <button onClick={() => onSelect(p.id)} className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">عرض</button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-medium mb-2">بحث سريع</h3>
          <SearchBar onSelect={(id) => onSelect(id)} phones={phones} />

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-600">روابط سريعة</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link to="/phones" className="hover:underline">جميع الهواتف</Link></li>
              <li><Link to="/compare" className="hover:underline">أداة المقارنة</Link></li>
              <li><Link to="/news" className="hover:underline">الأخبار والمراجعات</Link></li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="mt-8">
        <h3 className="font-semibold mb-3">هواتف مشهورة</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {phones.map((p) => (
            <PhoneCard key={p.id} phone={p} onSelect={onSelect} />
          ))}
        </div>
      </section>
    </main>
  );
}

function PhoneCard({ phone, onSelect }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
      <div className="h-40 bg-gray-50 rounded flex items-center justify-center">📱</div>
      <div className="mt-3 flex-1">
        <div className="font-semibold">{phone.brand} {phone.name}</div>
        <div className="text-sm text-gray-500">{phone.specs.chipset}</div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-indigo-600 font-semibold">${phone.price}</div>
        <div className="flex gap-2">
          <Link to={`/phones/${phone.id}`} className="text-sm px-3 py-1 border rounded">تفاصيل</Link>
          <button onClick={() => onSelect(phone.id)} className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">أضف للمقارنة</button>
        </div>
      </div>
    </div>
  );
}

function PhonesList({ phones, onAddCompare }) {
  const [brand, setBrand] = useState("");
  const [minRam, setMinRam] = useState(0);
  const [sortBy, setSortBy] = useState("released");

  const brands = useMemo(() => Array.from(new Set(phones.map((p) => p.brand))), [phones]);

  const filtered = useMemo(() => {
    return phones
      .filter((p) => (brand ? p.brand === brand : true))
      .filter((p) => p.specs.memory.ram >= minRam)
      .sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "ram") return b.specs.memory.ram - a.specs.memory.ram;
        // default: released desc
        return new Date(b.released) - new Date(a.released);
      });
  }, [phones, brand, minRam, sortBy]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">قائمة الهواتف</h2>
        <div className="flex gap-3">
          <select className="border rounded px-3 py-2" value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">كل الشركات</option>
            {brands.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <select className="border rounded px-3 py-2" value={minRam} onChange={(e) => setMinRam(Number(e.target.value))}>
            <option value={0}>كل الذاكرة</option>
            <option value={4}>4GB+</option>
            <option value={6}>6GB+</option>
            <option value={8}>8GB+</option>
            <option value={12}>12GB+</option>
          </select>
          <select className="border rounded px-3 py-2" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="released">الأحدث</option>
            <option value="price">السعر (تصاعدي)</option>
            <option value="ram">الذاكرة (تنازلي)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <div key={p.id}>
            <PhoneCard phone={p} onSelect={onAddCompare} />
          </div>
        ))}
      </div>
    </main>
  );
}

function PhoneDetail({ phones, onAddCompare }) {
  const { id } = useParams();
  const phone = phones.find((p) => p.id === id);
  const navigate = useNavigate();
  if (!phone) return <div className="p-8">الهاتف غير موجود</div>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex gap-6 items-start">
        <div className="w-48 h-96 bg-gray-50 rounded flex items-center justify-center">📱</div>
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">{phone.brand} {phone.name}</h1>
            <div className="text-indigo-600 font-bold text-xl ml-auto">${phone.price}</div>
          </div>
          <div className="text-sm text-gray-500 mt-1">{phone.specs.chipset} • {phone.specs.memory.ram}GB • أُصدر في {phone.released}</div>

          <div className="mt-4 flex gap-3">
            <button onClick={() => onAddCompare(phone.id)} className="bg-indigo-600 text-white px-4 py-2 rounded">أضف للمقارنة</button>
            <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded">عودة</button>
          </div>

          <section className="mt-6 bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-3">ملخص سريع</h3>
            <div className="grid grid-cols-2 gap-4">
              <SpecItem label="الشاشة" value={`${phone.specs.display.size}\" ${phone.specs.display.type} (${phone.specs.display.refresh}Hz)`} />
              <SpecItem label="البطارية" value={`${phone.specs.battery.capacity} mAh • شحن ${phone.specs.battery.charging}W`} />
              <SpecItem label="الكاميرا" value={`${phone.specs.camera.main}MP (رئيسية)`} />
              <SpecItem label="الذاكرة" value={`${phone.specs.memory.ram}GB RAM • ${phone.specs.memory.storage}GB`} />
            </div>

            <div className="mt-4">
              <h4 className="font-medium mb-2">جدول المواصفات</h4>
              <table className="w-full text-sm border-collapse">
                <tbody>
                  <SpecRow label="المعالج" value={phone.specs.chipset} />
                  <SpecRow label="نظام التشغيل" value={phone.specs.os} />
                  <SpecRow label="الوزن" value={`${phone.specs.weight} g`} />
                  <SpecRow label="دقة الشاشة" value={phone.specs.display.resolution} />
                </tbody>
              </table>
            </div>

          </section>
        </div>
      </div>
    </main>
  );
}

function SpecItem({ label, value }) {
  return (
    <div className="bg-gray-50 rounded p-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function SpecRow({ label, value }) {
  return (
    <tr className="border-t">
      <td className="py-2 w-40 text-gray-600">{label}</td>
      <td className="py-2">{value}</td>
    </tr>
  );
}

function ComparePage({ phones, compareIds, onRemove, onClear }) {
  const selected = phones.filter((p) => compareIds.includes(p.id));

  // Build a list of spec keys we want to compare
  const keys = [
    { key: "price", label: "السعر" },
    { key: "specs.display.size", label: "حجم الشاشة (in)" },
    { key: "specs.display.refresh", label: "تحديث الشاشة (Hz)" },
    { key: "specs.battery.capacity", label: "بطارية (mAh)" },
    { key: "specs.camera.main", label: "كاميرا رئيسية (MP)" },
    { key: "specs.memory.ram", label: "ذاكرة RAM (GB)" },
    { key: "specs.weight", label: "الوزن (g)" },
  ];

  // helper to read nested value by path
  const getValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), obj);
  };

  // determine best values (simple logic: higher is better except price and weight)
  const best = {};
  keys.forEach((k) => {
    const vals = selected.map((p) => getValue(p, k.key)).filter((v) => v !== undefined);
    if (vals.length === 0) return;
    if (k.key === 'price' || k.key === 'specs.weight') {
      best[k.key] = Math.min(...vals);
    } else {
      best[k.key] = Math.max(...vals);
    }
  });

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">مقارنة الهواتف</h2>
        <div className="flex gap-2">
          <button onClick={onClear} className="px-3 py-1 border rounded">مسح</button>
        </div>
      </div>

      {selected.length === 0 ? (
        <div className="p-8 text-center bg-white rounded shadow-sm">لم يتم اختيار أي هاتف للمقارنة. اذهب إلى صفحة <Link to="/phones" className="text-indigo-600 underline">قائمة الهواتف</Link> لإضافة هواتف.</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="p-3 text-left">الخانة</th>
                {selected.map((p) => (
                  <th key={p.id} className="p-3 text-left">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">{p.brand} {p.name}</div>
                      <div className="ml-auto flex gap-2">
                        <button onClick={() => onRemove(p.id)} className="text-xs px-2 py-1 border rounded">حذف</button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {keys.map((k) => (
                <tr key={k.key} className="border-t">
                  <td className="p-3 font-medium w-48">{k.label}</td>
                  {selected.map((p) => {
                    const v = getValue(p, k.key);
                    const isBest = v !== undefined && v === best[k.key];
                    const highlight = isBest ? 'bg-green-50' : '';
                    return (
                      <td key={p.id} className={`p-3 ${highlight}`}>
                        {v === undefined ? '-' : v}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

function News() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold">الأخبار والمراجعات</h2>
      <div className="mt-4 bg-white p-4 rounded shadow-sm">
        <p className="text-sm text-gray-600">هذا قسم تجريبي للأخبار. في نسخة حية وصل بيانات الأخبار من CMS أو RSS.</p>
      </div>
    </main>
  );
}

export default function App() {
  const [phones] = useState(mockPhones);
  const [compareIds, setCompareIds] = useState([]);

  const navigate = (id) => {
    // internal navigation helper
  };

  const addToCompare = (id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev; // avoid duplicates
      return [...prev, id].slice(0, 4); // limit to 4 phones
    });
  };

  const removeFromCompare = (id) => setCompareIds((prev) => prev.filter((x) => x !== id));
  const clearCompare = () => setCompareIds([]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header compareCount={compareIds.length} />

        <Routes>
          <Route path="/" element={<Home phones={phones} onSelect={(id) => window.location.href = `/phones/${id}`} />} />
          <Route path="/phones" element={<PhonesList phones={phones} onAddCompare={addToCompare} />} />
          <Route path="/phones/:id" element={<PhoneDetail phones={phones} onAddCompare={addToCompare} />} />
          <Route path="/compare" element={<ComparePage phones={phones} compareIds={compareIds} onRemove={removeFromCompare} onClear={clearCompare} />} />
          <Route path="/news" element={<News />} />
          <Route path="*" element={<div className="p-8">الصفحة غير موجودة</div>} />
        </Routes>

        <footer className="mt-12 bg-white border-t">
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">© MobileSpecs - نموذج أولي لتصميم UX/UI</div>
        </footer>
      </div>
    </Router>
  );
}
