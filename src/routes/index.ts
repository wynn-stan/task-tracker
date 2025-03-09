const routes = {
  index: '/tasks',
  schedule: {
    today: '/schedule/today',
    upcoming: '/schedule/upcoming',
    overdue: '/schedule/overdue',
  },
  tasks: {
    all: '/tasks/all',
    high: '/tasks/high',
    medium: '/tasks/medium',
    low: '/tasks/low',
    completed: '/tasks/completed',
  },

  manage: {
    trash: '/tasks/trash',
  },
};

export default routes;
