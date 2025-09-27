import { CronJob } from "cron";
import { Container } from "inversify";
import { DeletePendingUploads } from "../../core";

export const pendingUploadsCleanupCron = (container: Container) => {
  const _deletePendingUploads = container.get(DeletePendingUploads);

  CronJob.from({
    cronTime: "0 5 0 * * *", // every day at midnight
    onTick: async () => {
      await _deletePendingUploads.execute();
    },
    start: true,
  });
};
