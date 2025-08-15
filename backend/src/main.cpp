#include "../third_party/httplib.h"
#include "../third_party/json.hpp"

#include <mutex>
#include <vector>
#include <atomic>

using json = nlohmann::json;

struct Task
{
    uint64_t id;
    std::string title;
    std::string day;
};

int main()
{

    httplib::Server svr;

    svr.set_default_headers({{"Access-Control-Allow-Origin", "http://localhost:3000"},
                             {"Access-Control-Allow-Headers", "Content-Type"},
                             {"Access-Control-Allow-Methods", "POST, GET, OPTIONS"}});

    svr.Options(R"(/api/.*)", [](const httplib::Request &, httplib::Response &res)
                {
                    res.status = 204; // No Content
                });

    std::mutex mtx;
    std::vector<Task> tasks;
    std::atomic<uint64_t> next_id{1};

    svr.Get("/api/health", [&](const httplib::Request &, httplib::Response &res)
            { res.set_content(R"({"status":"ok"})", "application/json"); });

    svr.Get("/api/tasks", [&](const httplib::Request &, httplib::Response &res)
        {
            std::lock_guard<std::mutex> lock(mtx);
            json arr = json::array();
            for (const Task &t : tasks) {
                arr.push_back({{"id", t.id}, {"title", t.title}, {"day", t.day}});
            }
            res.set_content(arr.dump(), "application/json");
        });

    svr.Post("/api/tasks", [&](const httplib::Request &req, httplib::Response &res)
        {
            try {
                json body = json::parse(req.body);
                if (!body.contains("email") || !body.contains("tasks") || !body["tasks"].is_array()) {
                    res.status = 400;
                    res.set_content("bad payload", "text/plain");
                    return;
                }

                std::string email = body["email"].get<std::string>();

                std::lock_guard<std::mutex> lock(mtx);
                for (const auto& t : body["tasks"]) {
                    if (!t.contains("day") || !t.contains("title")) continue;

                    std::string day = t["day"].get<std::string>();
                    std::string title = t["title"].get<std::string>();

                    Task task{next_id++, email + ": " + title, day};
                    tasks.push_back(task);
                }

                res.status = 201;
                res.set_content(R"({"ok":true})", "application/json");

                for (Task& t : tasks) {
                    std::cout << "User - " << t.id << std::endl;
                    std::cout << "Details { " << t.day << " - " << t.title << " }" << std::endl;
                }

            } catch (...) {
                res.status = 400;
            }
        });

    std::cout << "API on http://localhost:8080\n";
    svr.listen("0.0.0.0", 8080);
}