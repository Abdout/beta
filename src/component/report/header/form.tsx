// Form component
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface FormProps {
  setTriggerUpdate: (value: boolean) => void;
}

const HeaderForm: React.FC<FormProps> = ({ setTriggerUpdate }) => {
  const [customer, setCustomer] = useState("");
  const [consultant, setConsultant] = useState("");
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [tag, setTag] = useState("");
  const [sheet, setSheet] = useState("");

  const router = useRouter();

  useEffect(() => {
    // Fetch the existing data when the component mounts
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/report");
      const data = await res.json();
      if (data && data.headers && data.headers.length > 0) {
        const header = data.headers[0];
        setCustomer(header.customer);
        setConsultant(header.consultant);
        setClient(header.client);
        setDescription(header.description);
        setProjectName(header.projectName);
        setDate(header.date);
        setLocation(header.location);
        setTag(header.tag);
        setSheet(header.sheet);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !customer ||
      !consultant ||
      !client ||
      !description ||
      !projectName ||
      !date ||
      !location ||
      !tag ||
      !sheet
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/report`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          customer,
          consultant,
          client,
          description,
          projectName,
          date,
          location,
          tag,
          sheet,
        }),
      });

      if (res.ok) {
        setTriggerUpdate((prev) => !prev);
        router.push("/report");
      } else {
        throw new Error("Failed to create/update a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setCustomer(e.target.value)}
        value={customer}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Customer"
      />
      <input
        onChange={(e) => setConsultant(e.target.value)}
        value={consultant}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Consultant"
      />
      <input
        onChange={(e) => setClient(e.target.value)}
        value={client}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Client"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Description"
      />
      <input
        onChange={(e) => setProjectName(e.target.value)}
        value={projectName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Project Name"
      />
      <input
        onChange={(e) => setDate(e.target.value)}
        value={date}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Date"
      />
      <input
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Location"
      />
      <input
        onChange={(e) => setTag(e.target.value)}
        value={tag}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Tag"
      />
      <input
        onChange={(e) => setSheet(e.target.value)}
        value={sheet}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Sheet"
      />
      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Update Header
      </button>
    </form>
  );
};

export default HeaderForm;
