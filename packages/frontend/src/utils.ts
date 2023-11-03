import toast from "solid-toast";

const comingSoonToast = () => {
  toast.error("Oops! Pas encore disponible", {
    style: {
      background: "#fff",
      color: "#000"
    },
    iconTheme: {
      primary: "#0069FD",
      secondary: "#fff"
    }
  });
};

function formatDate(date: Date) {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2)
    month = "0" + month;
  if (day.length < 2)
    day = "0" + day;

  return [year, month, day].join("-");
}

const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const getMonth = (monthNbr: number) => months[monthNbr - 1];

export { comingSoonToast, formatDate, getMonth };
