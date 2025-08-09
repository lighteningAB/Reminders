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
};

int main()
{

    httplib::Server svr;
    std::mutex mtx;
    std::vector<Task> tasks;
    std::atomic<uint64_t> next_id{1};

    svr.Get("/api/health", [](const httplib::Request &, httplib::Response &res)
            { res.set_content(R"({"status":"ok"})", "application/json"); });

    svr.Get("/api/tasks", [&](const httplib::Request &, httplib::Response &res)
            {
        std::lock_guard<std::mutex> lock(mtx);
        json arr = json::array();
        for (Task &t : tasks) arr.push_back({{"id", t.id}, {"title", t.title}});
        res.set_content(arr.dump(), "application/json"); });

    svr.Post("/api/tasks", [&](const httplib::Request &req, httplib::Response &res)
             {
        try {
            auto body = json::parse(req.body);
            if (!body.contains("title")) { res.status = 400; return; }
            Task t{next_id++, body["title"].get<std::string>()};
            { std::lock_guard<std::mutex> lock(mtx); tasks.push_back(t); }
            res.status = 201;
            res.set_content(json{{"id", t.id}, {"title", t.title}}.dump(), "application/json");
        } catch(...) {
            res.status = 400;
        } });

    std::cout << "Listening on http://localhost:8080\n";
    svr.listen("0.0.0.0", 8080);
}