export type ListItemProps = {
  text: string;
  hyperlink?: Array<{
    index: number;
    href: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
  }>;
};

export type CardSliderItem = {
  widthRem?: number;
  image: {
    src: string;
    alt: string;
    objectFit?: "cover" | "contain";
    objectPosition?: "center" | "top" | "bottom" | "left" | "right";
    heightRem?: number;
  };
  title?: string | React.ReactNode;
} & (
  | {
      mode: "custom";
      descriptionContent: React.ReactNode;
    }
  | {
      mode: "description";
      descriptionContent: string;
    }
  | {
      mode: "list-number";
      descriptionContent?: ListItemProps[];
    }
  | {
      mode: "list-bullet";
      descriptionContent?: ListItemProps[];
    }
);

// interface FlightData {
//   destination: string;
//   departure: string;
//   arrival: string;
//   passengers: number;
//   isRoundtrip: boolean;
//   selectedFlightId: string | null;
// }

// type FlightState = FlightData &
//   (
//     | {
//         status: "idle";
//       }
//     | {
//         status: "submitting";
//         selectedFlightId: null;
//       }
//     | {
//         status: "error";
//       }
//     | {
//         status: "success";
//         flights: FlightOption[];
//       }
//   );
