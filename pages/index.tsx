import CustomLayout from "@/components/Layout/Layout";
import { Table } from "antd";
import * as Ably from "ably";

const columns = [
  {
    title: "World",
    dataIndex: "channelId",
    key: "channelId",
    render: (text: string) => {
      const regex = /(\d+)/; // Matches one or more digits

      const match = text.match(regex);
      if (match) {
        const number = match[0];
        return number;
      } else {
        return "All Players";
      }
    },
  },
  {
    title: "Players",
    dataIndex: "status",
    key: "status",
    render: (status: any) => {
      return status.occupancy.metrics.connections;
    },
    sorter: (a: any, b: any) =>
      a.status.occupancy.metrics.connections -
      b.status.occupancy.metrics.connections,
    defaultSortOrder: "decend" as any,
  },
];

interface HomeProps {
  data: Ably.Types.ChannelDetails[];
}
export default function Home({ data }: HomeProps) {
  // Use the fetched data here
  console.log(data);

  return (
    <CustomLayout>
      <Table
        style={{ maxWidth: 450, margin: "0 auto" }}
        pagination={false}
        columns={columns}
        dataSource={data}
      ></Table>
    </CustomLayout>
  );
}

export async function getStaticProps() {
  try {
    console.log(process.env.ABLY_API_KEY);
    const response = await fetch("https://rest.ably.io/channels", {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(process.env.ABLY_API_KEY as string),
      },
    });

    const data = await response.json();

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      props: {
        data: null,
      },
    };
  }
}
