import React, { useState } from 'react';
import { 
  Activity, 
  Users, 
  Building, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import ChartContainer from '../components/Dashboard/ChartContainer';
import LineChart from '../components/Charts/LineChart';
import BarChart from '../components/Charts/BarChart';

const Monitoring: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7days');

  // Mock data for connection activities
  const connectionFlowData = [
    { month: 'T1', value: 450, target: 400 },
    { month: 'T2', value: 520, target: 450 },
    { month: 'T3', value: 580, target: 500 },
    { month: 'T4', value: 620, target: 550 },
    { month: 'T5', value: 680, target: 600 },
    { month: 'T6', value: 750, target: 650 },
  ];

  const channelEffectivenessData = [
    { label: 'TTDVVL tỉnh HY', value: 68.5, color: '#16a34a' },
    { label: 'Portal Online', value: 45.2, color: '#0284c7' },
    { label: 'Liên hệ trực tiếp', value: 72.8, color: '#ea580c' },
    { label: 'Sự kiện tuyển dụng', value: 58.3, color: '#7c3aed' },
    { label: 'Mạng xã hội', value: 35.7, color: '#dc2626' }
  ];

  const supplyDemandData = [
    { label: 'Cung lao động', value: 2850 },
    { label: 'Cầu lao động', value: 3200 },
    { label: 'Đã kết nối', value: 2340 },
    { label: 'Chờ xử lý', value: 860 }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'job_posting',
      title: 'Công ty TNHH ABC đăng 25 vị trí tuyển dụng',
      channel: 'TTDVVL tỉnh Hưng Yên',
      time: '2 giờ trước',
      status: 'active'
    },
    {
      id: 2,
      type: 'candidate_match',
      title: '15 ứng viên được giới thiệu việc làm',
      channel: 'Portal Online',
      time: '4 giờ trước',
      status: 'completed'
    },
    {
      id: 3,
      type: 'interview',
      title: '8 cuộc phỏng vấn được sắp xếp',
      channel: 'TTDVVL tỉnh Hưng Yên',
      time: '6 giờ trước',
      status: 'scheduled'
    },
    {
      id: 4,
      type: 'hiring',
      title: '5 ứng viên được tuyển dụng thành công',
      channel: 'Liên hệ trực tiếp',
      time: '8 giờ trước',
      status: 'completed'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'job_posting':
        return <Building className="text-blue-600" size={16} />;
      case 'candidate_match':
        return <Users className="text-green-600" size={16} />;
      case 'interview':
        return <Clock className="text-orange-600" size={16} />;
      case 'hiring':
        return <CheckCircle className="text-purple-600" size={16} />;
      default:
        return <Activity className="text-gray-600" size={16} />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-blue-100 text-blue-800', label: 'Đang hoạt động' },
      completed: { color: 'bg-green-100 text-green-800', label: 'Hoàn thành' },
      scheduled: { color: 'bg-orange-100 text-orange-800', label: 'Đã lên lịch' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Chờ xử lý' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Giám sát hoạt động kết nối
          </h1>
          <p className="text-gray-600">
            Theo dõi luồng thông tin cung-cầu lao động và hiệu quả các kênh kết nối
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="7days">7 ngày qua</option>
            <option value="30days">30 ngày qua</option>
            <option value="3months">3 tháng qua</option>
            <option value="6months">6 tháng qua</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Tổng hoạt động kết nối"
          value="1,847"
          change={{ value: 15.3, type: 'increase' }}
          icon={Activity}
          color="green"
        />
        <StatsCard
          title="TTDVVL tỉnh HY"
          value="1,265"
          change={{ value: 8.7, type: 'increase' }}
          icon={Building}
          color="blue"
        />
        <StatsCard
          title="Tỷ lệ thành công"
          value="68.5%"
          change={{ value: 4.2, type: 'increase' }}
          icon={Target}
          color="orange"
        />
        <StatsCard
          title="Thời gian xử lý TB"
          value="2.3 ngày"
          change={{ value: 12.1, type: 'decrease' }}
          icon={Clock}
          color="purple"
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Connection Flow Trend */}
        <ChartContainer
          title="Luồng thông tin cung-cầu lao động"
          subtitle="Xu hướng hoạt động kết nối qua các tháng"
        >
          <LineChart data={connectionFlowData} color="#16a34a" />
        </ChartContainer>

        {/* Channel Effectiveness */}
        <ChartContainer
          title="Hiệu quả các kênh kết nối"
          subtitle="Tỷ lệ thành công (%) theo từng kênh"
        >
          <BarChart data={channelEffectivenessData} orientation="horizontal" />
        </ChartContainer>

        {/* Supply-Demand Balance */}
        <ChartContainer
          title="Cân bằng cung-cầu lao động"
          subtitle="Tình hình cung cầu và kết nối hiện tại"
        >
          <BarChart data={supplyDemandData} />
        </ChartContainer>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Chỉ số hiệu suất
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Trung tâm DV việc làm tỉnh HY</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">85%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Portal tuyển dụng online</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">72%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sự kiện job fair</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">68%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Kênh mạng xã hội</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">45%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Hoạt động gần đây
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Theo dõi các hoạt động kết nối mới nhất trong hệ thống
            </p>
          </div>
          
          <div className="p-6 space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">
                      {activity.channel}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  {getStatusBadge(activity.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Cảnh báo hệ thống
            </h3>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <AlertTriangle className="text-yellow-500" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Tỷ lệ kết nối giảm
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Kênh mạng xã hội có tỷ lệ thành công thấp trong 3 ngày qua
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <CheckCircle className="text-green-500" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Hoạt động bình thường
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  TTDVVL tỉnh HY đang hoạt động ổn định
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <TrendingUp className="text-blue-500" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Xu hướng tích cực
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Số lượng việc làm mới tăng 15% so với tuần trước
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Performance Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Chi tiết hiệu suất các kênh
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Đánh giá chi tiết hiệu quả từng kênh kết nối việc làm
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Kênh kết nối
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tổng hoạt động
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Thành công
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tỷ lệ (%)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Thời gian TB
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                {
                  channel: 'Trung tâm DV việc làm tỉnh Hưng Yên',
                  total: 1265,
                  successful: 1075,
                  rate: 85.0,
                  avgTime: '1.8 ngày',
                  status: 'excellent'
                },
                {
                  channel: 'Portal tuyển dụng online',
                  total: 894,
                  successful: 644,
                  rate: 72.0,
                  avgTime: '2.5 ngày',
                  status: 'good'
                },
                {
                  channel: 'Sự kiện job fair',
                  total: 456,
                  successful: 310,
                  rate: 68.0,
                  avgTime: '1.2 ngày',
                  status: 'good'
                },
                {
                  channel: 'Kênh mạng xã hội',
                  total: 234,
                  successful: 105,
                  rate: 45.0,
                  avgTime: '3.8 ngày',
                  status: 'needs_improvement'
                }
              ].map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.channel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.successful.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.rate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.avgTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      row.status === 'excellent' ? 'bg-green-100 text-green-800' :
                      row.status === 'good' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {row.status === 'excellent' ? 'Xuất sắc' :
                       row.status === 'good' ? 'Tốt' :
                       'Cần cải thiện'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;