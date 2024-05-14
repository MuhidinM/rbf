interface Asset {
  assetIntervalStart?: number;
  assetIntervalEnd?: number;
  assetIncrement?: number;
  assetStartValue?: number;
  assetEndValue?: number;
  isValueIncreasing?: boolean;
}

export interface IntervalAndValue {
  interval: number;
  value: number;
}

export const calculateIntervalsAndValues = (
  asset: Asset
): IntervalAndValue[] => {
  const intervalsAndValues: IntervalAndValue[] = [];

  if (
    asset &&
    asset.assetIntervalStart !== undefined &&
    asset.assetIntervalEnd !== undefined &&
    asset.assetIncrement !== undefined &&
    asset.assetStartValue !== undefined &&
    asset.assetEndValue !== undefined &&
    asset.assetIntervalStart <= asset.assetIntervalEnd
  ) {
    let value: number = asset.assetStartValue;

    for (
      let interval: number = asset.assetIntervalStart;
      interval <= asset.assetIntervalEnd;
      interval += asset.assetIncrement
    ) {
      intervalsAndValues.push({ interval, value });
      if (asset.isValueIncreasing) {
        value++;
      } else {
        value--;
      }
    }
  }

  return intervalsAndValues;
};
