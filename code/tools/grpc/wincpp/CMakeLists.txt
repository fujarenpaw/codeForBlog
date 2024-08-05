cmake_minimum_required( VERSION 3.1 )

project( grpc_example )

find_package(gRPC CONFIG REQUIRED)

find_package( Protobuf REQUIRED )

add_executable( server src/greeter_server.cc src/helloworld.grpc.pb.cc src/helloworld.pb.cc)

add_executable( client src/greeter_client.cc src/helloworld.grpc.pb.cc src/helloworld.pb.cc)

target_link_libraries( server PRIVATE gRPC::grpc++ gRPC::grpc++_reflection gRPC::gpr gRPC::grpc gRPC::grpc++ protobuf::libprotoc protobuf::libprotobuf protobuf::libprotobuf-lite absl::flags absl::flags_parse )

target_link_libraries( client PRIVATE gRPC::grpc++ gRPC::grpc++_reflection gRPC::gpr gRPC::grpc gRPC::grpc++ protobuf::libprotoc protobuf::libprotobuf protobuf::libprotobuf-lite absl::flags absl::flags_parse )