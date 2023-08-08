import {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
}

const ServerTimingViz: FunctionComponent = () => {
  const [header, setHeader] = useState('')
  const [data, setData] = useState<Number[]>([])
  const [labels, setLabels] = useState<String[]>([])

  const onHeaderChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      setHeader(event.target.value.trim())
    },
    [setHeader],
  )

  useEffect(() => {
    const parsedData: number[] = []
    const parsedLabels: string[] = []

    header
      .split(/,\s*/)
      .filter(Boolean)
      .forEach((item) => {
        const [
          ,
          label,
          descriptorType1,
          descriptorValue1,
          descriptorType2,
          descriptorValue2,
        ] =
          item.match(
            /(.+?);(dur|desc)="?(.+?)"?(?:;(dur|desc)="?(.+?)"?)?$/i,
          ) ?? []

        let itemData: number = 0
        let itemLabel = label

        if (descriptorType1 === 'desc') {
          itemLabel = descriptorValue1 as string
        } else if (descriptorType2 === 'desc') {
          itemLabel = descriptorValue2 as string
        }

        if (descriptorType1 === 'dur') {
          itemData = Number(descriptorValue1)
        } else if (descriptorType2 === 'dur') {
          itemData = Number(descriptorValue2)
        }

        if (!itemLabel || !itemData) {
          return
        }

        parsedData.push(itemData)
        parsedLabels.push(itemLabel as string)
      })

    setData(parsedData)
    setLabels(parsedLabels)
  }, [header])

  const chartData = {
    labels,
    datasets: [
      {
        data,
      },
    ],
  }

  return (
    <div className="flex flex-col">
      <textarea
        className="h-24 my-4 p-2"
        placeholder="Enter Server-Timing header value..."
        value={header}
        onChange={onHeaderChange}
      ></textarea>

      <Bar className="flex-1" options={options} data={chartData} />
    </div>
  )
}

export default ServerTimingViz
