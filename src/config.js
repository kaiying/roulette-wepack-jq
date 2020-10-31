// 暫時是一次性活動，後端沒有存資料，所以只能 hardcode

export const eventConfig = {
  activity: 'ROULETTE2020',
  total: 8,
  values: [100, 200, 50, 300, 1000, 100, 150, 500],
  valueMapping: {
    100: 0,
    200: 1,
    50: 2,
    300: 3,
    1000: 4,
    // 100: 5, // 重複金額
    150: 6,
    500: 7,
  },
};
